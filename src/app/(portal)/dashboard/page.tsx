import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { isAdminRole } from "@/lib/auth/roles";

export default async function DashboardPage() {
  const user = await requireUser();

  redirect(isAdminRole(user.role) ? "/admin" : "/projects");
}
