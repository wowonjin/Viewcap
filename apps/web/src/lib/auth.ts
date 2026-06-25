import { cookies } from "next/headers";
import { prisma, type User } from "@viewcap/database";

const DEV_SESSION_COOKIE = "viewcap_dev_session";

export async function getSessionUser(): Promise<User | null> {
  if (process.env.DEV_AUTH_ENABLED === "true") {
    const cookieStore = await cookies();
    const email =
      cookieStore.get(DEV_SESSION_COOKIE)?.value ??
      process.env.DEV_AUTH_EMAIL ??
      "demo@viewcap.local";
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const { createServerClient } = await import("@supabase/ssr");
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    });
    const { data } = await supabase.auth.getUser();
    if (!data.user?.email) return null;
    return prisma.user.findUnique({ where: { email: data.user.email } });
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function isAdminEmail(email: string) {
  const admins = (process.env.ADMIN_EMAILS ?? "admin@viewcap.local")
    .split(",")
    .map((e) => e.trim());
  return admins.includes(email);
}

export async function requireAdmin() {
  const user = await requireUser();
  const admin = await prisma.adminUser.findUnique({
    where: { email: user.email },
  });
  const isAdmin = admin?.isActive || (await isAdminEmail(user.email));
  if (!isAdmin) throw new Error("FORBIDDEN");
  return { user, admin };
}

export async function upsertUserFromAuth(params: {
  email: string;
  name?: string;
  supabaseId?: string;
}) {
  const freePlan = await prisma.plan.findUnique({ where: { slug: "free" } });
  const user = await prisma.user.upsert({
    where: { email: params.email },
    update: {
      name: params.name,
      supabaseId: params.supabaseId,
    },
    create: {
      email: params.email,
      name: params.name,
      supabaseId: params.supabaseId,
      planId: freePlan?.id,
      creditBalance: 0,
    },
  });
  const { grantSignupBonus } = await import("./credits");
  await grantSignupBonus(user.id);
  return prisma.user.findUniqueOrThrow({ where: { id: user.id } });
}

export async function setDevSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(DEV_SESSION_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearDevSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DEV_SESSION_COOKIE);
}
