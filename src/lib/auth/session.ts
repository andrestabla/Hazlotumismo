import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminRole, type AppRole } from "@/lib/auth/roles";

export type AppSessionUser = {
  id: string;
  role: AppRole;
  name?: string | null;
  email?: string | null;
};

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return session.user as AppSessionUser;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (!isAdminRole(user.role)) {
    redirect("/projects");
  }

  return user;
}
