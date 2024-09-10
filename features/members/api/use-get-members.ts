import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  workspaceId: Id<"workspaces">;
}

export default function useGetMembersByWorkspaceIdIncludeRelatedUser({
  workspaceId,
}: Props) {
  const data = useQuery(api.members.getMembersByWorkspaceIdIncludeRelatedUser, {
    workspaceId,
  });
  const isLoading = data === undefined;
  return { data, isLoading };
}
