export function MarketingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="surface-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,200,75,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#08090b] to-transparent" />
    </div>
  );
}
