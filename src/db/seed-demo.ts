import { eq } from "drizzle-orm";
import { getDb } from "./index";
import {
  profiles,
  projectMembers,
  projects,
  purchases,
  sessionPackages,
  sessions,
  taskEvidence,
  tasks,
} from "./schema";

export async function seedDemoWorkspace() {
  const db = getDb();
  const now = new Date();

  const [advisor] = await db
    .insert(profiles)
    .values({
      authUserId: "demo-advisor",
      fullName: "Andrea Mentor",
      email: "advisor@hazlotumismo.demo",
      role: "advisor",
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: profiles.authUserId,
      set: {
        fullName: "Andrea Mentor",
        email: "advisor@hazlotumismo.demo",
        role: "advisor",
        updatedAt: now,
      },
    })
    .returning();

  const [client] = await db
    .insert(profiles)
    .values({
      authUserId: "demo-client",
      fullName: "Emilia Rojas",
      email: "client@hazlotumismo.demo",
      role: "client",
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: profiles.authUserId,
      set: {
        fullName: "Emilia Rojas",
        email: "client@hazlotumismo.demo",
        role: "client",
        updatedAt: now,
      },
    })
    .returning();

  const [admin] = await db
    .insert(profiles)
    .values({
      authUserId: "demo-admin",
      fullName: "Hazlo Admin",
      email: "admin@hazlotumismo.demo",
      role: "admin",
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: profiles.authUserId,
      set: {
        fullName: "Hazlo Admin",
        email: "admin@hazlotumismo.demo",
        role: "admin",
        updatedAt: now,
      },
    })
    .returning();

  let demoPackage = await db.query.sessionPackages.findFirst({
    where: (table, { eq: isEqual }) => isEqual(table.name, "Paquete base de 4 sesiones"),
  });

  if (!demoPackage) {
    [demoPackage] = await db
      .insert(sessionPackages)
      .values({
        name: "Paquete base de 4 sesiones",
        description: "Acompanamiento para discovery, implementacion y validacion.",
        sessionCount: 4,
        durationMinutes: 60,
        priceCents: 48000,
        currency: "USD",
      })
      .returning();
  }

  let demoProject = await db.query.projects.findFirst({
    where: eq(projects.slug, "asistente-comercial-ia"),
  });

  if (!demoProject) {
    [demoProject] = await db
      .insert(projects)
      .values({
        slug: "asistente-comercial-ia",
        name: "Asistente comercial con IA",
        summary: "Proyecto para crear un chatbot comercial con seguimiento de leads.",
        goal: "Cerrar un flujo que capture, califique y convierta prospectos con IA.",
        status: "active",
        progress: 68,
        clientProfileId: client.id,
        leadAdvisorProfileId: advisor.id,
        startDate: "2026-03-10",
        targetEndDate: "2026-04-15",
        updatedAt: now,
      })
      .returning();
  }

  await db
    .insert(projectMembers)
    .values([
      { projectId: demoProject.id, profileId: advisor.id, role: "advisor" },
      { projectId: demoProject.id, profileId: client.id, role: "client" },
      { projectId: demoProject.id, profileId: admin.id, role: "owner" },
    ])
    .onConflictDoNothing();

  const existingTasks = await db.query.tasks.findMany({
    where: eq(tasks.projectId, demoProject.id),
    columns: { id: true },
  });

  if (existingTasks.length === 0) {
    const insertedTasks = await db
      .insert(tasks)
      .values([
        {
          projectId: demoProject.id,
          title: "Definir prompts base",
          description: "Alinear respuestas con el tono y la oferta comercial.",
          status: "todo",
          priority: "high",
          assigneeProfileId: advisor.id,
          createdByProfileId: admin.id,
          position: 1,
        },
        {
          projectId: demoProject.id,
          title: "Checklist de onboarding",
          description: "Recibir FAQs, objeciones y mensajes de venta del cliente.",
          status: "todo",
          priority: "medium",
          assigneeProfileId: client.id,
          createdByProfileId: advisor.id,
          position: 2,
        },
        {
          projectId: demoProject.id,
          title: "Entrenar base de conocimiento",
          description: "Conectar documentos clave y estructura del negocio.",
          status: "in_progress",
          priority: "high",
          assigneeProfileId: advisor.id,
          createdByProfileId: advisor.id,
          position: 3,
        },
        {
          projectId: demoProject.id,
          title: "Pruebas con respuestas reales",
          description: "Validar escenarios de venta en la proxima sesion.",
          status: "in_review",
          priority: "medium",
          assigneeProfileId: advisor.id,
          createdByProfileId: advisor.id,
          position: 4,
        },
        {
          projectId: demoProject.id,
          title: "Mapa del flujo comercial",
          description: "Documento base del recorrido del prospecto.",
          status: "done",
          priority: "medium",
          assigneeProfileId: advisor.id,
          createdByProfileId: admin.id,
          position: 5,
        },
      ])
      .returning();

    const doneTask = insertedTasks.find((task) => task.title === "Mapa del flujo comercial");

    if (doneTask) {
      await db.insert(taskEvidence).values({
        taskId: doneTask.id,
        type: "note",
        title: "Mapa validado",
        content: "Se subio la estructura del proceso comercial y se reviso con el cliente.",
        createdByProfileId: advisor.id,
      });
    }
  }

  let demoPurchase = await db.query.purchases.findFirst({
    where: eq(purchases.projectId, demoProject.id),
  });

  if (!demoPurchase) {
    [demoPurchase] = await db
      .insert(purchases)
      .values({
        projectId: demoProject.id,
        clientProfileId: client.id,
        sessionPackageId: demoPackage.id,
        paymentProvider: "stripe",
        paymentReference: "demo-checkout-001",
        status: "paid",
        sessionsTotal: 4,
        sessionsRemaining: 2,
      })
      .returning();
  }

  const existingSessions = await db.query.sessions.findMany({
    where: eq(sessions.projectId, demoProject.id),
    columns: { id: true },
  });

  if (existingSessions.length === 0) {
    await db.insert(sessions).values([
      {
        projectId: demoProject.id,
        purchaseId: demoPurchase.id,
        advisorProfileId: advisor.id,
        clientProfileId: client.id,
        title: "Sesion 02 - flujo comercial",
        agenda: "Mapear escenarios, definir tono del bot y preparar pruebas.",
        notes: "Se definio estructura inicial del bot y tareas para la siguiente sesion.",
        meetingProvider: "google_meet",
        meetingUrl: "https://meet.google.com/demo-hazlo",
        scheduledFor: new Date("2026-03-15T19:00:00.000Z"),
        durationMinutes: 60,
        status: "completed",
      },
      {
        projectId: demoProject.id,
        purchaseId: demoPurchase.id,
        advisorProfileId: advisor.id,
        clientProfileId: client.id,
        title: "Sesion 03 - pruebas y ajustes",
        agenda: "Validar conversaciones, capturar objeciones y cerrar siguientes pasos.",
        meetingProvider: "google_meet",
        meetingUrl: "https://meet.google.com/demo-hazlo-next",
        scheduledFor: new Date("2026-03-18T00:00:00.000Z"),
        durationMinutes: 60,
        status: "scheduled",
      },
    ]);
  }

  return demoProject.slug;
}
