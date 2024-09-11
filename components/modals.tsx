"use client";

import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import ClientOnly from "./client-only";
import CreateChannelModal from "@/features/channels/components/create-channel-modal";

export default function Modals() {
  return (
    <ClientOnly>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </ClientOnly>
  );
}
