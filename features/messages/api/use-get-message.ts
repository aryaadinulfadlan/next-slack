import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  messageId: Id<"messages">;
}

export const useGetMessageById = ({ messageId }: Props) => {
  const data = useQuery(api.messages.getMessageById, { messageId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
