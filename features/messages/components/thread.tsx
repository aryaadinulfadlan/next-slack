import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { AlertTriangle, Loader, X } from "lucide-react";
import { useGetMessageById } from "../api/use-get-message";
import Message from "@/components/message";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useCurrentMember from "@/features/members/api/use-current-member";
import { useState } from "react";

interface Props {
  messageId: Id<"messages">;
  onCloseMessage: () => void;
}
export default function Thread({ messageId, onCloseMessage }: Props) {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
  const workspaceId = useWorkspaceId();

  const { data: currentMember } = useCurrentMember({ workspaceId });
  const { data: message, isLoading: loadingMessage } = useGetMessageById({
    messageId,
  });
  if (loadingMessage) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onCloseMessage} size="iconSmall" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onCloseMessage} size="iconSmall" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="h-[49px] flex justify-between items-center px-4 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onCloseMessage} size="iconSmall" variant="ghost">
          <X className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div>
        <Message
          id={message._id}
          memberId={message.memberId}
          authorImage={message.user.image}
          authorName={message.user.name}
          isAuthor={message.memberId === currentMember?._id}
          reactions={message.reactions}
          body={message.body}
          image={message.image}
          updatedAt={message.updatedAt}
          createdAt={message._creationTime}
          isEditing={message._id === editingId}
          setEditingId={setEditingId}
          hideThreadButton
        />
      </div>
    </div>
  );
}
