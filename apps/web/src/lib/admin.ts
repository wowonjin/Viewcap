import { prisma } from "@viewcap/database";

export async function writeAuditLog(params: {
  actorAdminId: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  before?: object;
  after?: object;
  reason?: string;
}) {
  return prisma.adminAuditLog.create({ data: params });
}

export async function getOrCreateAdminUser(email: string) {
  return prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, role: "ADMIN" },
  });
}
