"use server";

import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { seedDemoWorkspace } from "@/db/seed-demo";
import { findProjectSlugsStartingWith } from "@/db/workspace";
import { projectMembers, projects, purchases, sessions, taskEvidence, tasks } from "@/db/schema";
import { slugify } from "@/lib/slugify";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
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
  const db = getDb();
  const name = readString(formData, "name");
  const summary = readOptionalString(formData, "summary");
  const goal = readOptionalString(formData, "goal");
  const clientProfileId = readOptionalString(formData, "clientProfileId");
  const leadAdvisorProfileId = readOptionalString(formData, "leadAdvisorProfileId");

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
  ].filter((item): item is { projectId: string; profileId: string; role: "advisor" | "client" } =>
    Boolean(item),
  );

  if (memberships.length > 0) {
    await db.insert(projectMembers).values(memberships).onConflictDoNothing();
  }

  revalidatePath("/workspace");
  redirect(`/workspace/${project.slug}`);
}

export async function createTaskAction(formData: FormData) {
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
    position: Number(positionRow?.value ?? 0) + 1,
    updatedAt: new Date(),
  });

  revalidatePath(`/workspace/${projectSlug}`);
}

export async function updateTaskWorkflowAction(formData: FormData) {
  const db = getDb();
  const taskId = readString(formData, "taskId");
  const projectSlug = readString(formData, "projectSlug");
  const status = readString(formData, "status") as
    | "backlog"
    | "todo"
    | "in_progress"
    | "in_review"
    | "done";
  const priority = readString(formData, "priority") as "low" | "medium" | "high";

  if (!taskId || !projectSlug) {
    throw new Error("Missing task action context");
  }

  await db
    .update(tasks)
    .set({
      status,
      priority,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, taskId));

  revalidatePath(`/workspace/${projectSlug}`);
}

export async function addEvidenceAction(formData: FormData) {
  const db = getDb();
  const taskId = readString(formData, "taskId");
  const projectSlug = readString(formData, "projectSlug");
  const title = readString(formData, "title");
  const content = readOptionalString(formData, "content");
  const url = readOptionalString(formData, "url");
  const type = (readOptionalString(formData, "type") ?? "note") as
    | "file"
    | "link"
    | "note"
    | "checklist";

  if (!taskId || !projectSlug || !title) {
    throw new Error("Missing evidence context");
  }

  await db.insert(taskEvidence).values({
    taskId,
    title,
    content,
    url,
    type,
  });

  revalidatePath(`/workspace/${projectSlug}`);
}

export async function createSessionAction(formData: FormData) {
  const db = getDb();
  const projectId = readString(formData, "projectId");
  const projectSlug = readString(formData, "projectSlug");
  const title = readString(formData, "title");
  const agenda = readOptionalString(formData, "agenda");
  const scheduledFor = readOptionalString(formData, "scheduledFor");
  const durationMinutes = Number(readString(formData, "durationMinutes") || "60");
  const advisorProfileId = readString(formData, "advisorProfileId");
  const clientProfileId = readString(formData, "clientProfileId");
  const meetingUrl = readOptionalString(formData, "meetingUrl");
  const purchaseId = readOptionalString(formData, "purchaseId");

  if (!projectId || !projectSlug || !title || !advisorProfileId || !clientProfileId) {
    throw new Error("Missing session context");
  }

  const selectedPurchase = purchaseId
    ? await db.query.purchases.findFirst({
        where: eq(purchases.id, purchaseId),
      })
    : null;

  if (purchaseId && (!selectedPurchase || selectedPurchase.sessionsRemaining <= 0)) {
    throw new Error("The selected purchase has no remaining sessions");
  }

  await db.insert(sessions).values({
    projectId,
    purchaseId,
    advisorProfileId,
    clientProfileId,
    title,
    agenda,
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

  revalidatePath(`/workspace/${projectSlug}`);
}

export async function seedWorkspaceAction() {
  const projectSlug = await seedDemoWorkspace();
  revalidatePath("/workspace");
  redirect(`/workspace/${projectSlug}`);
}
