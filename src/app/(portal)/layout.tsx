import { getPortalSidebarData } from "@/db/portal";
import { PortalSidebar } from "@/components/portal/sidebar";
import { requireUser } from "@/lib/auth/session";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();
  const sidebarData = await getPortalSidebarData(user);

  return (
    <div className="site-shell min-h-screen lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]">
      <PortalSidebar user={user} sidebarData={sidebarData} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
