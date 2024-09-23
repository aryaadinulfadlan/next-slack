"use client";

import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const { replace } = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const firstWorkspaceID = data?.[0]?._id;
  useEffect(() => {
    if (isLoading) return;
    if (firstWorkspaceID) {
      replace(`/workspace/${firstWorkspaceID}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, firstWorkspaceID, open]);

  // console.log({ workspaceId, data });
  return (
    <div className="h-full flex items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
