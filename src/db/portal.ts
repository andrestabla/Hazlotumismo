import { and, count, eq, or } from "drizzle-orm";
import { getDb } from "@/db";
import { projectMembers, projects, purchases, sessionPackages, sessions, tasks } from "@/db/schema";
import { isAdminRole, isAdvisorRole } from "@/lib/auth/roles";
import type { AppSessionUser } from "@/lib/auth/session";

type ProjectWithWorkspaceData = NonNullable<Awaited<ReturnType<typeof getProjectByIdWithWorkspaceData>>>;

async function getProjectByIdWithWorkspaceData(projectId: string) {
  const db = getDb();

  return db.query.projects.findFirst({
    where: eq(projects.id, projectId),
    with: {
      client: true,
      leadAdvisor: true,
      tasks: true,
      sessions: true,
    },
  });
}

async function getAccessibleProjectIds(user: AppSessionUser) {
  const db = getDb();

  if (isAdminRole(user.role)) {
    const allProjects = await db.query.projects.findMany({
      columns: { id: true },
    });

    return allProjects.map((project) => project.id);
  }

  const memberships = await db.query.projectMembers.findMany({
    where: eq(projectMembers.profileId, user.id),
    columns: { projectId: true },
  });

  return memberships.map((membership) => membership.projectId);
}

export async function getProjectsPageData(user: AppSessionUser) {
  const db = getDb();
  const projectIds = await getAccessibleProjectIds(user);
  const canCreateProject = isAdvisorRole(user.role);

  const accessibleProjects = isAdminRole(user.role)
    ? await db.query.projects.findMany({
        with: {
          client: true,
          leadAdvisor: true,
          tasks: true,
          sessions: true,
        },
        orderBy: (table, { desc: sortDesc }) => [sortDesc(table.updatedAt)],
      })
    : projectIds.length === 0
      ? []
      : await Promise.all(
          projectIds.map((projectId) => getProjectByIdWithWorkspaceData(projectId)),
        ).then((items): ProjectWithWorkspaceData[] =>
          items.filter((item): item is ProjectWithWorkspaceData => Boolean(item)),
        );

  const selectableProfiles = canCreateProject
    ? await db.query.profiles.findMany({
        orderBy: (table, { asc }) => [asc(table.fullName)],
      })
    : [];

  return {
    canCreateProject,
    profiles: selectableProfiles,
    projects: accessibleProjects.map((project) => ({
      ...project,
      taskCount: project.tasks.length,
      completedTaskCount: project.tasks.filter((task) => task.status === "done").length,
      scheduledSessionCount: project.sessions.filter((session) => session.status === "scheduled")
        .length,
    })),
  };
}

export async function getProjectBySlugForUser(slug: string, user: AppSessionUser) {
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
        orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
      },
      sessions: {
        with: {
          advisor: true,
          client: true,
          purchase: {
            with: {
              sessionPackage: true,
            },
          },
        },
        orderBy: (table, { desc: sortDesc }) => [sortDesc(table.scheduledFor)],
      },
    },
  });

  if (!project) {
    return null;
  }

  if (isAdminRole(user.role)) {
    return project;
  }

  const isMember = project.members.some((member) => member.profileId === user.id);
  return isMember ? project : null;
}

export async function getSessionsPageData(user: AppSessionUser) {
  const db = getDb();
  const personalSessions = isAdminRole(user.role)
    ? await db.query.sessions.findMany({
        with: {
          project: true,
          advisor: true,
          client: true,
          purchase: {
            with: {
              sessionPackage: true,
            },
          },
        },
        orderBy: (table, { desc: sortDesc }) => [sortDesc(table.scheduledFor)],
      })
    : await db.query.sessions.findMany({
        where: or(eq(sessions.advisorProfileId, user.id), eq(sessions.clientProfileId, user.id)),
        with: {
          project: true,
          advisor: true,
          client: true,
          purchase: {
            with: {
              sessionPackage: true,
            },
          },
        },
        orderBy: (table, { desc: sortDesc }) => [sortDesc(table.scheduledFor)],
      });

  const personalPurchases =
    user.role === "client"
      ? await db.query.purchases.findMany({
          where: eq(purchases.clientProfileId, user.id),
          with: {
            project: true,
            sessionPackage: true,
            client: true,
          },
          orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
        })
      : isAdminRole(user.role)
        ? await db.query.purchases.findMany({
            with: {
              project: true,
              sessionPackage: true,
              client: true,
            },
            orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
          })
        : [];

  const availablePackages =
    user.role === "client" || isAdminRole(user.role)
      ? await db.query.sessionPackages.findMany({
          where: eq(sessionPackages.isActive, true),
          orderBy: (table, { asc }) => [asc(table.priceCents)],
        })
      : [];

  const availableProjects =
    user.role === "client"
      ? await db.query.projectMembers.findMany({
          where: eq(projectMembers.profileId, user.id),
          with: {
            project: {
              with: {
                client: true,
              },
            },
          },
        })
      : [];

  return {
    sessions: personalSessions,
    purchases: personalPurchases,
    packages: availablePackages,
    projects: availableProjects.map((membership) => membership.project),
  };
}

export async function getAdminDashboardData() {
  const db = getDb();
  const [allProfiles, allProjects, allSessions, allPurchases, allPackages] = await Promise.all([
    db.query.profiles.findMany({
      orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
    }),
    db.query.projects.findMany({
      with: {
        client: true,
        leadAdvisor: true,
      },
      orderBy: (table, { desc: sortDesc }) => [sortDesc(table.updatedAt)],
    }),
    db.query.sessions.findMany({
      with: {
        project: true,
        advisor: true,
        client: true,
      },
      orderBy: (table, { desc: sortDesc }) => [sortDesc(table.scheduledFor)],
    }),
    db.query.purchases.findMany({
      with: {
        project: true,
        client: true,
        sessionPackage: true,
      },
      orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
    }),
    db.query.sessionPackages.findMany({
      orderBy: (table, { desc: sortDesc }) => [sortDesc(table.createdAt)],
    }),
  ]);

  return {
    profiles: allProfiles,
    projects: allProjects,
    sessions: allSessions,
    purchases: allPurchases,
    packages: allPackages,
    stats: {
      profiles: allProfiles.length,
      clients: allProfiles.filter((profile) => profile.role === "client").length,
      advisors: allProfiles.filter((profile) => profile.role === "advisor").length,
      admins: allProfiles.filter((profile) => profile.role === "admin").length,
      projects: allProjects.length,
      activeProjects: allProjects.filter((project) => project.status === "active").length,
      sessions: allSessions.length,
      scheduledSessions: allSessions.filter((session) => session.status === "scheduled").length,
      purchases: allPurchases.length,
      paidPurchases: allPurchases.filter((purchase) => purchase.status === "paid").length,
      packages: allPackages.length,
    },
  };
}

export async function getPurchaseSummaryForProject(projectId: string) {
  const db = getDb();
  const [purchaseCountRow] = await db
    .select({ value: count() })
    .from(purchases)
    .where(eq(purchases.projectId, projectId));

  const [taskCountRow] = await db
    .select({ value: count() })
    .from(tasks)
    .where(eq(tasks.projectId, projectId));

  const [sessionCountRow] = await db
    .select({ value: count() })
    .from(sessions)
    .where(eq(sessions.projectId, projectId));

  return {
    purchases: Number(purchaseCountRow?.value ?? 0),
    tasks: Number(taskCountRow?.value ?? 0),
    sessions: Number(sessionCountRow?.value ?? 0),
  };
}

export async function isProjectMember(userId: string, projectId: string) {
  const db = getDb();
  const membership = await db.query.projectMembers.findFirst({
    where: and(eq(projectMembers.profileId, userId), eq(projectMembers.projectId, projectId)),
  });

  return Boolean(membership);
}
