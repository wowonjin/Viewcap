import { Suspense } from "react";
import { AppShell } from "@/components/app/app-shell";
import { RenderingPoller } from "@/components/project/rendering-poller";

export default async function RenderingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell>
      <Suspense>
        <RenderingPoller projectId={id} />
      </Suspense>
    </AppShell>
  );
}
