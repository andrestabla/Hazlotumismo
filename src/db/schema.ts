import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const profileRoleEnum = pgEnum("profile_role", ["admin", "advisor", "client"]);
export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "active",
  "on_hold",
  "completed",
  "cancelled",
]);
export const membershipRoleEnum = pgEnum("membership_role", [
  "owner",
  "advisor",
  "client",
  "observer",
]);
export const taskStatusEnum = pgEnum("task_status", [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);
export const evidenceTypeEnum = pgEnum("evidence_type", ["file", "link", "note", "checklist"]);
export const purchaseStatusEnum = pgEnum("purchase_status", [
  "pending",
  "paid",
  "cancelled",
  "refunded",
]);
export const sessionStatusEnum = pgEnum("session_status", [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
]);
export const meetingProviderEnum = pgEnum("meeting_provider", [
  "google_meet",
  "zoom",
  "other",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authUserId: varchar("auth_user_id", { length: 191 }).notNull().unique(),
    fullName: varchar("full_name", { length: 191 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash"),
    isActive: boolean("is_active").notNull().default(true),
    role: profileRoleEnum("role").notNull().default("client"),
    ...timestamps,
  },
  (table) => ({
    emailIdx: uniqueIndex("profiles_email_idx").on(table.email),
    roleIdx: index("profiles_role_idx").on(table.role),
  }),
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    summary: text("summary"),
    goal: text("goal"),
    status: projectStatusEnum("status").notNull().default("draft"),
    progress: integer("progress").notNull().default(0),
    clientProfileId: uuid("client_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    leadAdvisorProfileId: uuid("lead_advisor_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    startDate: date("start_date"),
    targetEndDate: date("target_end_date"),
    ...timestamps,
  },
  (table) => ({
    slugIdx: uniqueIndex("projects_slug_idx").on(table.slug),
    statusIdx: index("projects_status_idx").on(table.status),
  }),
);

export const projectMembers = pgTable(
  "project_members",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    role: membershipRoleEnum("role").notNull().default("client"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.profileId] }),
    roleIdx: index("project_members_role_idx").on(table.role),
  }),
);

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 191 }).notNull(),
    description: text("description"),
    status: taskStatusEnum("status").notNull().default("todo"),
    priority: taskPriorityEnum("priority").notNull().default("medium"),
    assigneeProfileId: uuid("assignee_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    createdByProfileId: uuid("created_by_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    position: integer("position").notNull().default(0),
    dueDate: date("due_date"),
    ...timestamps,
  },
  (table) => ({
    projectStatusIdx: index("tasks_project_status_idx").on(table.projectId, table.status),
    assigneeIdx: index("tasks_assignee_idx").on(table.assigneeProfileId),
  }),
);

export const taskEvidence = pgTable(
  "task_evidence",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    type: evidenceTypeEnum("type").notNull().default("note"),
    title: varchar("title", { length: 191 }).notNull(),
    content: text("content"),
    url: text("url"),
    createdByProfileId: uuid("created_by_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    taskIdx: index("task_evidence_task_idx").on(table.taskId),
  }),
);

export const sessionPackages = pgTable(
  "session_packages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    sessionCount: integer("session_count").notNull(),
    durationMinutes: integer("duration_minutes").notNull().default(60),
    priceCents: integer("price_cents").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps,
  },
  (table) => ({
    activeIdx: index("session_packages_active_idx").on(table.isActive),
  }),
);

export const purchases = pgTable(
  "purchases",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    clientProfileId: uuid("client_profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "restrict" }),
    sessionPackageId: uuid("session_package_id")
      .notNull()
      .references(() => sessionPackages.id, { onDelete: "restrict" }),
    paymentProvider: varchar("payment_provider", { length: 32 }).notNull().default("stripe"),
    paymentReference: varchar("payment_reference", { length: 191 }),
    status: purchaseStatusEnum("status").notNull().default("pending"),
    sessionsTotal: integer("sessions_total").notNull(),
    sessionsRemaining: integer("sessions_remaining").notNull(),
    ...timestamps,
  },
  (table) => ({
    projectIdx: index("purchases_project_idx").on(table.projectId),
    statusIdx: index("purchases_status_idx").on(table.status),
  }),
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    purchaseId: uuid("purchase_id").references(() => purchases.id, { onDelete: "set null" }),
    advisorProfileId: uuid("advisor_profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "restrict" }),
    clientProfileId: uuid("client_profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "restrict" }),
    title: varchar("title", { length: 191 }).notNull(),
    agenda: text("agenda"),
    notes: text("notes"),
    meetingProvider: meetingProviderEnum("meeting_provider")
      .notNull()
      .default("google_meet"),
    meetingUrl: text("meeting_url"),
    scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
    durationMinutes: integer("duration_minutes").notNull().default(60),
    status: sessionStatusEnum("status").notNull().default("scheduled"),
    ...timestamps,
  },
  (table) => ({
    projectScheduleIdx: index("sessions_project_schedule_idx").on(
      table.projectId,
      table.scheduledFor,
    ),
    statusIdx: index("sessions_status_idx").on(table.status),
  }),
);

export const profilesRelations = relations(profiles, ({ many }) => ({
  projectMemberships: many(projectMembers),
  assignedTasks: many(tasks, { relationName: "assignee" }),
  createdTasks: many(tasks, { relationName: "creator" }),
  createdEvidence: many(taskEvidence),
}));

export const projectsRelations = relations(projects, ({ many, one }) => ({
  client: one(profiles, {
    fields: [projects.clientProfileId],
    references: [profiles.id],
    relationName: "project_client",
  }),
  leadAdvisor: one(profiles, {
    fields: [projects.leadAdvisorProfileId],
    references: [profiles.id],
    relationName: "project_lead_advisor",
  }),
  members: many(projectMembers),
  tasks: many(tasks),
  purchases: many(purchases),
  sessions: many(sessions),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  profile: one(profiles, {
    fields: [projectMembers.profileId],
    references: [profiles.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ many, one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignee: one(profiles, {
    fields: [tasks.assigneeProfileId],
    references: [profiles.id],
    relationName: "assignee",
  }),
  createdBy: one(profiles, {
    fields: [tasks.createdByProfileId],
    references: [profiles.id],
    relationName: "creator",
  }),
  evidence: many(taskEvidence),
}));

export const taskEvidenceRelations = relations(taskEvidence, ({ one }) => ({
  task: one(tasks, {
    fields: [taskEvidence.taskId],
    references: [tasks.id],
  }),
  createdBy: one(profiles, {
    fields: [taskEvidence.createdByProfileId],
    references: [profiles.id],
  }),
}));

export const purchasesRelations = relations(purchases, ({ many, one }) => ({
  project: one(projects, {
    fields: [purchases.projectId],
    references: [projects.id],
  }),
  client: one(profiles, {
    fields: [purchases.clientProfileId],
    references: [profiles.id],
  }),
  sessionPackage: one(sessionPackages, {
    fields: [purchases.sessionPackageId],
    references: [sessionPackages.id],
  }),
  sessions: many(sessions),
}));

export const sessionPackagesRelations = relations(sessionPackages, ({ many }) => ({
  purchases: many(purchases),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  project: one(projects, {
    fields: [sessions.projectId],
    references: [projects.id],
  }),
  purchase: one(purchases, {
    fields: [sessions.purchaseId],
    references: [purchases.id],
  }),
  advisor: one(profiles, {
    fields: [sessions.advisorProfileId],
    references: [profiles.id],
    relationName: "session_advisor",
  }),
  client: one(profiles, {
    fields: [sessions.clientProfileId],
    references: [profiles.id],
    relationName: "session_client",
  }),
}));
