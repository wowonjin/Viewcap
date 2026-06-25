import { AppShell } from "@/components/app/app-shell";
import { EditorLoader } from "@/components/editor/editor-loader";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell>
      <h1 className="mb-6 text-3xl font-bold">미리보기 에디터</h1>
      <EditorLoader projectId={id} />
    </AppShell>
  );
}
