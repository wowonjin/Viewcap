import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function AdminShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const admin = await prisma.adminUser.findUnique({ where: { email: user.email } });
  const allowed = admin?.isActive || (await isAdminEmail(user.email));
  if (!allowed) redirect("/dashboard");

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/render-jobs", label: "Render Jobs" },
    { href: "/admin/billing", label: "Billing" },
    { href: "/admin/credits", label: "Credits" },
    { href: "/admin/support", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-white">
              ViewCap Admin
            </Link>
            <nav className="hidden gap-4 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${active === link.href ? "text-blue-400" : "text-slate-400 hover:text-white"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
            앱으로
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
