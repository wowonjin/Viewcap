"use client";

import { ArrowRight, CheckCircle2, Film, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/marketing/motion";
import { BreadcrumbJsonLd, FaqJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/json-ld";
import { faqItems, SITE_NAME, SITE_URL } from "@/lib/seo/site-config";
import type { LandingPageConfig } from "@/lib/seo/landing-config";

export function SeoLandingPage({ config }: { config: LandingPageConfig }) {
  return (
    <MarketingLayout>
      <SoftwareApplicationJsonLd name={config.title} url={`${SITE_URL}/${config.slug}`} description={config.description} />
      <FaqJsonLd items={faqItems.slice(0, 3)} />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: config.title, href: `/${config.slug}` }]} />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            {SITE_NAME} 워크플로우
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">{config.h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{config.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup?next=/projects/new">
                {config.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">요금 보기</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="glass-card rounded-lg p-4">
            <div className="aspect-[16/10] rounded-lg border border-white/10 bg-[linear-gradient(135deg,#181b20,#242015_55%,#101112)] p-5">
              <div className="grid h-full grid-cols-[1fr_0.56fr] gap-4">
                <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-black/[0.24] p-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Film className="h-4 w-4 text-primary" />
                      편집 초안
                    </div>
                    <div className="mt-4 aspect-video rounded-md bg-black/35" />
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-1">
                    {[70, 42, 86, 56, 68].map((height, index) => (
                      <div key={index} className="flex h-9 items-end rounded bg-white/[0.08] px-1">
                        <span className="w-full rounded-sm bg-primary/75" style={{ height: `${height}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/[0.28] p-4">
                  <div className="text-sm font-semibold text-primary">검토 항목</div>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {config.bullets.slice(0, 4).map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerGroup className="grid gap-4 md:grid-cols-3">
            {config.bullets.map((bullet) => (
              <StaggerItem key={bullet}>
                <div className="glass-card h-full rounded-lg p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{bullet}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </MarketingLayout>
  );
}
