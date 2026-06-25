import Link from "next/link";
import { redirect } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { formatCredits } from "@/lib/utils";

export async function AppShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const links = [
    { href: "/dashboard", label: "대시보드" },
    { href: "/projects/new", label: "새 영상" },
    { href: "/settings/billing", label: "결제/크레딧" },
  ];

  return (
    <div className="min-h-screen bg-[#07080d]">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07080d]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 ring-1 ring-indigo-500/30">
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <span className="font-bold">
                View<span className="gradient-text">Cap</span>
              </span>
            </Link>
            <nav className="hidden gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active === link.href
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
              {formatCredits(user.creditBalance)}
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/api/auth/logout">로그아웃</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
