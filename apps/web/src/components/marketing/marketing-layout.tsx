import { MarketingBackground } from "./marketing-background";
import { MarketingFooter, MarketingHeader } from "./site-chrome";

export function MarketingLayout({
  children,
  header = true,
  footer = true,
}: {
  children: React.ReactNode;
  header?: boolean;
  footer?: boolean;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07080d] text-foreground">
      <MarketingBackground />
      {header && <MarketingHeader />}
      <main className="relative">{children}</main>
      {footer && <MarketingFooter />}
    </div>
  );
}
