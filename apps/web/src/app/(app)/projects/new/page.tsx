import { AppShell } from "@/components/app/app-shell";
import { NewProjectForm } from "@/components/project/new-project-form";

export default function NewProjectPage() {
  return (
    <AppShell active="/projects/new">
      <h1 className="mb-6 text-3xl font-bold">새 영상 만들기</h1>
      <NewProjectForm />
    </AppShell>
  );
}
