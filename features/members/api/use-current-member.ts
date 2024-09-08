import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  workspaceId: Id<"workspaces">;
}

export default function useCurrentMember({ workspaceId }: Props) {
  const data = useQuery(api.members.current, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
}
