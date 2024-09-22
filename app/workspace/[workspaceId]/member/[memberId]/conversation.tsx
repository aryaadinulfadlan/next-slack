import { Id } from "@/convex/_generated/dataModel";
import useGetMemberById from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import useMemberId from "@/hooks/use-member-id";
import { Loader } from "lucide-react";
import ConversationHeader from "./header";
import ChatInput from "./chat-input";
import MessageList from "@/components/message-list";

interface Props {
  conversationId: Id<"conversations">;
}
export default function Conversation({ conversationId }: Props) {
  const memberId = useMemberId();
  const { data: member, isLoading: memberLoading } = useGetMemberById({
    memberId,
  });
  const { results, status, loadMore } = useGetMessages({ conversationId });
  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ConversationHeader
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />
      <MessageList
        data={results}
        variant="conversation"
        memberImage={member?.user.image}
        memberName={member?.user.name}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={conversationId}
      />
    </div>
  );
}