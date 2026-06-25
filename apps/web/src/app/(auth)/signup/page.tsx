import { Suspense } from "react";
import SignupPageClient from "./signup-client";

export default function SignupPage() {
  return (
    <Suspense>
      <SignupPageClient />
    </Suspense>
  );
}
