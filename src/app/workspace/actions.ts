"use server";

import { hash } from "bcryptjs";
import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { seedDemoWorkspace } from "@/db/seed-demo";
import { isProjectMember } from "@/db/portal";
import { findProjectSlugsStartingWith } from "@/db/workspace";
import {
  profiles,
  projectMembers,
  projects,
  purchases,
  sessionPackages,
  sessions,
  taskEvidence,
  tasks,
} from "@/db/schema";
import type { AppSessionUser } from "@/lib/auth/session";
import { isAdminRole, isAdvisorRole, isAppRole } from "@/lib/auth/roles";
import { isMeetingProvider, type MeetingProvider } from "@/lib/meetings";
import { slugify } from "@/lib/slugify";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
}

function readMeetingProvider(formData: FormData, key: string): MeetingProvider {
  const value = readString(formData, key);
  return isMeetingProvider(value) ? value : "google_meet";
}

async function requireActionUser() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user as AppSessionUser;
}

function assertCanCreateProject(user: AppSessionUser) {
  if (!isAdvisorRole(user.role)) {
    throw new Error("Only advisors or admins can create projects");
  }
}

async function assertProjectAccess(user: AppSessionUser, projectId: string) {
  if (isAdminRole(user.role)) {
    return;
  }

  const canAccess = await isProjectMember(user.id, projectId);

  if (!canAccess) {
    throw new Error("Forbidden");
  }
}

async function createUniqueProjectSlug(name: string) {
  const baseSlug = slugify(name) || "proyecto";
  const matchingSlugs = await findProjectSlugsStartingWith(baseSlug);

  if (!matchingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;

  while (matchingSlugs.includes(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseSlug}-${suffix}`;
}

export async function createProjectAction(formData: FormData) {
  const user = await requireActionUser();
  assertCanCreateProject(user);

  const db = getDb();
  const name = readString(formData, "name");
  const summary = readOptionalString(formData, "summary");
  const goal = readOptionalString(formData, "goal");
  const clientProfileId = readOptionalString(formData, "clientProfileId");
  const selectedLeadAdvisorProfileId = readOptionalString(formData, "leadAdvisorProfileId");
  const leadAdvisorProfileId =
    selectedLeadAdvisorProfileId ?? (user.role === "advisor" ? user.id : null);

  if (!name) {
    throw new Error("Project name is required");
  }

  const slug = await createUniqueProjectSlug(name);
  const [project] = await db
    .insert(projects)
    .values({
      slug,
      name,
      summary,
      goal,
      status: "draft",
      progress: 0,
      clientProfileId,
      leadAdvisorProfileId,
      updatedAt: new Date(),
    })
    .returning();

  const memberships = [
    {
      projectId: project.id,
      profileId: user.id,
      role: isAdminRole(user.role) ? ("owner" as const) : ("advisor" as const),
    },
    clientProfileId
      ? {
          projectId: project.id,
          profileId: clientProfileId,
          role: "client" as const,
        }
      : null,
    leadAdvisorProfileId
      ? {
          projectId: project.id,
          profileId: leadAdvisorProfileId,
          role: "advisor" as const,
        }
      : null,
  ].filter(
    (
      item,
    ): item is { projectId: string; profileId: string; role: "owner" | "advisor" | "client" } =>
      Boolean(item),
  );

  if (memberships.length > 0) {
    await db.insert(projectMembers).values(memberships).onConflictDoNothing();
  }

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/workspace");
  redirect(`/projects/${project.slug}`);
}

export async function createTaskAction(formData: FormData) {
  const user = await requireActionUser();
  const db = getDb();
  const projectId = readString(formData, "projectId");
  const projectSlug = readString(formData, "projectSlug");
  const title = readString(formData, "title");
  const description = readOptionalString(formData, "description");
  const assigneeProfileId = readOptionalString(formData, "assigneeProfileId");
  const dueDate = readOptionalString(formData, "dueDate");
  const priority = (readOptionalString(formData, "priority") ?? "medium") as
    | "low"
    | "medium"
    | "high";

  if (!projectId || !projectSlug || !title) {
    throw new Error("Missing task context");
  }

  await assertProjectAccess(user, projectId);

  const [positionRow] = await db
    .select({ value: count() })
    .from(tasks)
    .where(eq(tasks.projectId, projectId));

  await db.insert(tasks).values({
    projectId,
    title,
    description,
    assigneeProfileId,
    dueDate,
    priority,
    status: "todo",
    createdByProfileId: user.id,
    position: Number(positionRow?.value ?? 0) + 1,
    updatedAt: new Date(),
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath(`/workspace/${projectSlug}`);
}

export async function updateTaskWorkflowAction(formData: FormData) {
  const user = await requireActionUser();
  const db = getDb();
  const taskId = readString(formData, "taskId");
  const projectSlug = readString(formData, "projectSlug");
  const projectId = readString(formData, "projectId");
  const status = readString(formData, "status") as
    | "backlog"
    | "todo"
    | "in_progress"
    | "in_review"
    | "done";
  const priority = readString(formData, "priority") as "low" | "medium" | "high";

  if (!taskId || !projectSlug || !projectId) {
    throw new Error("Missing task action context");
  }

  await assertProjectAccess(user, projectId);

  await db
    .update(tasks)
    .set({
      status,
      priority,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, taskId));

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath(`/workspace/${projectSlug}`);
}

export async function addEvidenceAction(formData: FormData) {
  const user = await requireActionUser();
  const db = getDb();
  const taskId = readString(formData, "taskId");
  const projectSlug = readString(formData, "projectSlug");
  const projectId = readString(formData, "projectId");
  const title = readString(formData, "title");
  const content = readOptionalString(formData, "content");
  const url = readOptionalString(formData, "url");
  const type = (readOptionalString(formData, "type") ?? "note") as
    | "file"
    | "link"
    | "note"
    | "checklist";

  if (!taskId || !projectSlug || !projectId || !title) {
    throw new Error("Missing evidence context");
  }

  await assertProjectAccess(user, projectId);

  await db.insert(taskEvidence).values({
    taskId,
    title,
    content,
    url,
    type,
    createdByProfileId: user.id,
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath(`/workspace/${projectSlug}`);
}

export async function createSessionAction(formData: FormData) {
  const user = await requireActionUser();
  const db = getDb();
  const projectId = readString(formData, "projectId");
  const projectSlug = readString(formData, "projectSlug");
  const title = readString(formData, "title");
  const agenda = readOptionalString(formData, "agenda");
  const scheduledFor = readOptionalString(formData, "scheduledFor");
  const durationMinutes = Number(readString(formData, "durationMinutes") || "60");
  const advisorProfileId = readString(formData, "advisorProfileId");
  const clientProfileId = readString(formData, "clientProfileId");
  const meetingProvider = readMeetingProvider(formData, "meetingProvider");
  const meetingUrl = readOptionalString(formData, "meetingUrl");
  const purchaseId = readOptionalString(formData, "purchaseId");

  if (!projectId || !projectSlug || !title || !advisorProfileId || !clientProfileId) {
    throw new Error("Missing session context");
  }

  await assertProjectAccess(user, projectId);

  const selectedPurchase = purchaseId
    ? await db.query.purchases.findFirst({
        where: eq(purchases.id, purchaseId),
      })
    : null;

  if (purchaseId && (!selectedPurchase || selectedPurchase.sessionsRemaining <= 0)) {
    throw new Error("The selected purchase has no remaining sessions");
  }

  if (
    selectedPurchase &&
    (selectedPurchase.projectId !== projectId ||
      selectedPurchase.clientProfileId !== clientProfileId ||
      selectedPurchase.status !== "paid")
  ) {
    throw new Error("The selected purchase does not belong to this session context");
  }

  await db.insert(sessions).values({
    projectId,
    purchaseId,
    advisorProfileId,
    clientProfileId,
    title,
    agenda,
    meetingProvider,
    meetingUrl,
    durationMinutes,
    scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
    status: "scheduled",
    updatedAt: new Date(),
  });

  if (selectedPurchase) {
    await db
      .update(purchases)
      .set({
        sessionsRemaining: selectedPurchase.sessionsRemaining - 1,
        updatedAt: new Date(),
      })
      .where(eq(purchases.id, purchaseId!));
  }

  revalidatePath("/dashboard");
  revalidatePath("/sessions");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath(`/workspace/${projectSlug}`);
}

export async function seedWorkspaceAction() {
  const user = await requireActionUser();

  if (!isAdminRole(user.role)) {
    throw new Error("Only admins can seed demo data");
  }

  const projectSlug = await seedDemoWorkspace();
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath("/sessions");
  revalidatePath("/admin");
  revalidatePath("/workspace");
  redirect(`/projects/${projectSlug}`);
}

export async function purchaseSessionPackageAction(formData: FormData) {
  const user = await requireActionUser();

  if (!isAdminRole(user.role) && user.role !== "client") {
    throw new Error("Only clients or admins can register purchases");
  }

  const db = getDb();
  const projectId = readString(formData, "projectId");
  const sessionPackageId = readString(formData, "sessionPackageId");
  const selectedClientProfileId = readOptionalString(formData, "clientProfileId");

  if (!projectId || !sessionPackageId) {
    throw new Error("Missing purchase context");
  }

  if (!isAdminRole(user.role)) {
    await assertProjectAccess(user, projectId);
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const sessionPackage = await db.query.sessionPackages.findFirst({
    where: eq(sessionPackages.id, sessionPackageId),
  });

  if (!sessionPackage) {
    throw new Error("Package not found");
  }

  const clientProfileId = isAdminRole(user.role) ? selectedClientProfileId : user.id;

  if (!clientProfileId) {
    throw new Error("A client is required for the purchase");
  }

  if (project.clientProfileId && project.clientProfileId !== clientProfileId) {
    throw new Error("The selected client does not match the project client");
  }

  await db.insert(purchases).values({
    projectId,
    clientProfileId,
    sessionPackageId,
    paymentProvider: "manual",
    paymentReference: `manual-${Date.now()}`,
    status: "paid",
    sessionsTotal: sessionPackage.sessionCount,
    sessionsRemaining: sessionPackage.sessionCount,
  });

  revalidatePath("/sessions");
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
}

export async function updateSessionStatusAction(formData: FormData) {
  const user = await requireActionUser();
  const db = getDb();
  const sessionId = readString(formData, "sessionId");
  const projectSlug = readOptionalString(formData, "projectSlug");
  const status = readString(formData, "status") as
    | "scheduled"
    | "completed"
    | "cancelled"
    | "no_show";
  const notes = readOptionalString(formData, "notes");

  if (!sessionId) {
    throw new Error("Missing session id");
  }

  const sessionRecord = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!sessionRecord) {
    throw new Error("Session not found");
  }

  if (
    !isAdminRole(user.role) &&
    sessionRecord.advisorProfileId !== user.id &&
    sessionRecord.clientProfileId !== user.id
  ) {
    throw new Error("Forbidden");
  }

  if (sessionRecord.purchaseId) {
    const purchase = await db.query.purchases.findFirst({
      where: eq(purchases.id, sessionRecord.purchaseId),
    });

    if (purchase) {
      if (sessionRecord.status !== "cancelled" && status === "cancelled") {
        await db
          .update(purchases)
          .set({
            sessionsRemaining: purchase.sessionsRemaining + 1,
            updatedAt: new Date(),
          })
          .where(eq(purchases.id, purchase.id));
      }

      if (sessionRecord.status === "cancelled" && status === "scheduled") {
        if (purchase.sessionsRemaining <= 0) {
          throw new Error("The purchase has no remaining sessions");
        }

        await db
          .update(purchases)
          .set({
            sessionsRemaining: purchase.sessionsRemaining - 1,
            updatedAt: new Date(),
          })
          .where(eq(purchases.id, purchase.id));
      }
    }
  }

  await db
    .update(sessions)
    .set({
      status,
      notes,
      updatedAt: new Date(),
    })
    .where(eq(sessions.id, sessionId));

  revalidatePath("/sessions");
  revalidatePath("/dashboard");

  if (projectSlug) {
    revalidatePath(`/projects/${projectSlug}`);
    revalidatePath(`/workspace/${projectSlug}`);
  }
}

export async function createUserAction(formData: FormData) {
  const user = await requireActionUser();

  if (!isAdminRole(user.role)) {
    throw new Error("Only admins can create users");
  }

  const db = getDb();
  const fullName = readString(formData, "fullName");
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");
  const role = readString(formData, "role");

  if (!fullName || !email || !password || !isAppRole(role)) {
    throw new Error("Invalid user payload");
  }

  const existingProfile = await db.query.profiles.findFirst({
    where: eq(profiles.email, email),
  });

  if (existingProfile) {
    throw new Error("A user with that email already exists");
  }

  const passwordHash = await hash(password, 10);

  await db.insert(profiles).values({
    authUserId: email,
    fullName,
    email,
    passwordHash,
    role,
    isActive: true,
  });

  revalidatePath("/admin");
}

export async function createSessionPackageAction(formData: FormData) {
  const user = await requireActionUser();

  if (!isAdminRole(user.role)) {
    throw new Error("Only admins can create packages");
  }

  const db = getDb();
  const name = readString(formData, "name");
  const description = readOptionalString(formData, "description");
  const sessionCount = Number(readString(formData, "sessionCount"));
  const durationMinutes = Number(readString(formData, "durationMinutes"));
  const priceDollars = Number(readString(formData, "priceDollars"));

  if (!name || !sessionCount || !durationMinutes || !priceDollars) {
    throw new Error("Invalid package payload");
  }

  await db.insert(sessionPackages).values({
    name,
    description,
    sessionCount,
    durationMinutes,
    priceCents: Math.round(priceDollars * 100),
    currency: "USD",
    isActive: true,
  });

  revalidatePath("/admin");
  revalidatePath("/sessions");
}

export async function toggleUserActiveStateAction(formData: FormData) {
  const user = await requireActionUser();

  if (!isAdminRole(user.role)) {
    throw new Error("Only admins can update users");
  }

  const db = getDb();
  const profileId = readString(formData, "profileId");
  const nextState = readString(formData, "nextState");

  if (!profileId || (nextState !== "activate" && nextState !== "deactivate")) {
    throw new Error("Invalid user toggle payload");
  }

  await db
    .update(profiles)
    .set({
      isActive: nextState === "activate",
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, profileId));

  revalidatePath("/admin");
}

export async function toggleSessionPackageActiveStateAction(formData: FormData) {
  const user = await requireActionUser();

  if (!isAdminRole(user.role)) {
    throw new Error("Only admins can update packages");
  }

  const db = getDb();
  const sessionPackageId = readString(formData, "sessionPackageId");
  const nextState = readString(formData, "nextState");

  if (!sessionPackageId || (nextState !== "activate" && nextState !== "deactivate")) {
    throw new Error("Invalid package toggle payload");
  }

  await db
    .update(sessionPackages)
    .set({
      isActive: nextState === "activate",
      updatedAt: new Date(),
    })
    .where(eq(sessionPackages.id, sessionPackageId));

  revalidatePath("/admin");
  revalidatePath("/sessions");
}
