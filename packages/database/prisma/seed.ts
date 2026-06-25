import {
  CreditTransactionType,
  PrismaClient,
  AdminRole,
} from "@prisma/client";

const prisma = new PrismaClient();

const SIGNUP_BONUS = 300;

async function main() {
  console.log("Seeding database...");

  const plans = [
    {
      slug: "free",
      name: "Free",
      description: "체험 사용자",
      priceKrw: 0,
      monthlyCredits: 300,
      maxUploadMinutes: 5,
      maxResolution: "720p",
      watermark: true,
      sortOrder: 0,
    },
    {
      slug: "starter",
      name: "Starter",
      description: "개인 크리에이터",
      priceKrw: 19900,
      monthlyCredits: 2000,
      maxUploadMinutes: 15,
      maxResolution: "1080p",
      watermark: false,
      sortOrder: 1,
    },
    {
      slug: "pro",
      name: "Pro",
      description: "강사 / 마케터",
      priceKrw: 49000,
      monthlyCredits: 6000,
      maxUploadMinutes: 30,
      maxResolution: "1080p",
      watermark: false,
      sortOrder: 2,
    },
    {
      slug: "studio",
      name: "Studio",
      description: "콘텐츠팀 / 학원",
      priceKrw: 99000,
      monthlyCredits: 15000,
      maxUploadMinutes: 60,
      maxResolution: "1080p",
      watermark: false,
      sortOrder: 3,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  const presets = [
    {
      slug: "lecture-shorts",
      name: "깔끔한 강의 쇼츠",
      description: "교육 콘텐츠에 최적화된 자막과 컷",
      config: {
        captionStyle: "education",
        fontSize: 44,
        transition: "fade",
        pace: "normal",
      },
      sortOrder: 0,
    },
    {
      slug: "reels-fast",
      name: "릴스형 빠른 편집",
      description: "빠른 컷과 강조 자막",
      config: {
        captionStyle: "bold",
        fontSize: 52,
        transition: "cut",
        pace: "fast",
      },
      sortOrder: 1,
    },
    {
      slug: "minimal-clean",
      name: "토스형 미니멀",
      description: "미니멀하고 깔끔한 스타일",
      config: {
        captionStyle: "minimal",
        fontSize: 38,
        transition: "fade",
        pace: "slow",
      },
      sortOrder: 2,
    },
  ];

  for (const preset of presets) {
    await prisma.stylePreset.upsert({
      where: { slug: preset.slug },
      update: preset,
      create: preset,
    });
  }

  await prisma.adminUser.upsert({
    where: { email: "admin@viewcap.local" },
    update: {},
    create: {
      email: "admin@viewcap.local",
      name: "ViewCap Admin",
      role: AdminRole.OWNER,
    },
  });

  const freePlan = await prisma.plan.findUnique({ where: { slug: "free" } });
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@viewcap.local" },
    update: {},
    create: {
      email: "demo@viewcap.local",
      name: "Demo User",
      planId: freePlan?.id,
      creditBalance: SIGNUP_BONUS,
      supabaseId: "demo-local-user",
    },
  });

  const existingLedger = await prisma.creditLedger.findFirst({
    where: { userId: demoUser.id, type: CreditTransactionType.SIGNUP_BONUS },
  });
  if (!existingLedger) {
    await prisma.creditLedger.create({
      data: {
        userId: demoUser.id,
        amount: SIGNUP_BONUS,
        balanceAfter: SIGNUP_BONUS,
        type: CreditTransactionType.SIGNUP_BONUS,
        description: "가입 보너스 크레딧",
      },
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
