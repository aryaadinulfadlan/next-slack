"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import useMemberId from "@/hooks/use-member-id";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Conversation from "./conversation";

export default function MemberIdPage() {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();
  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);
  const { mutate, data, isPending } = useCreateOrGetConversation();
  useEffect(() => {
    mutate(
      { memberId, workspaceId },
      {
        onSuccess(data) {
          setConversationId(data);
        },
        onError() {
          toast.error("Failed to create or get conversation");
        },
      }
    );
  }, [memberId, workspaceId]);

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!conversationId) {
    return (
      <div className="h-full flex flex-col gap-y-2 items-center justify-center">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation Not Found
        </span>
      </div>
    );
  }
  return <Conversation conversationId={conversationId} />;
}
