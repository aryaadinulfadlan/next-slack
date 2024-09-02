"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      <div>Logged IN</div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
