"use client";

import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import ClientOnly from "./client-only";

export default function Modals() {
  return (
    <ClientOnly>
      <CreateWorkspaceModal />
    </ClientOnly>
  );
}
