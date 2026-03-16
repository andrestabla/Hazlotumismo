import { eq, like } from "drizzle-orm";
import { getDb } from "@/db";
import { projects } from "@/db/schema";

export async function getWorkspaceIndexData() {
  if (!process.env.DATABASE_URL) {
    return {
      configured: false as const,
      profiles: [],
      packages: [],
      projects: [],
    };
  }

  const db = getDb();
  const [allProjects, allProfiles, allPackages] = await Promise.all([
    db.query.projects.findMany({
      with: {
        client: true,
        leadAdvisor: true,
        tasks: true,
        sessions: true,
      },
      orderBy: (table, { desc }) => [desc(table.updatedAt)],
    }),
    db.query.profiles.findMany({
      orderBy: (table, { asc }) => [asc(table.fullName)],
    }),
    db.query.sessionPackages.findMany({
      orderBy: (table, { asc }) => [asc(table.priceCents)],
    }),
  ]);

  return {
    configured: true as const,
    profiles: allProfiles,
    packages: allPackages,
    projects: allProjects.map((project) => ({
      ...project,
      taskCount: project.tasks.length,
      completedTaskCount: project.tasks.filter((task) => task.status === "done").length,
      scheduledSessionCount: project.sessions.filter((session) => session.status === "scheduled")
        .length,
    })),
  };
}

export async function getProjectWorkspaceData(slug: string) {
  if (!process.env.DATABASE_URL) {
    return {
      configured: false as const,
      project: null,
    };
  }

  const db = getDb();
  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
    with: {
      client: true,
      leadAdvisor: true,
      members: {
        with: {
          profile: true,
        },
      },
      tasks: {
        with: {
          assignee: true,
          createdBy: true,
          evidence: true,
        },
        orderBy: (table, { asc }) => [asc(table.position), asc(table.createdAt)],
      },
      purchases: {
        with: {
          sessionPackage: true,
          client: true,
        },
        orderBy: (table, { desc }) => [desc(table.createdAt)],
      },
      sessions: {
        with: {
          advisor: true,
          client: true,
          purchase: true,
        },
        orderBy: (table, { desc }) => [desc(table.scheduledFor)],
      },
    },
  });

  return {
    configured: true as const,
    project,
  };
}

export async function findProjectSlugsStartingWith(baseSlug: string) {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(like(projects.slug, `${baseSlug}%`));

  return rows.map((row) => row.slug);
}
