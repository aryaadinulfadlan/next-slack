"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  workspaceId: Id<"workspaces">;
}
export default function useGetWorkspaceInfo({ workspaceId }: Props) {
  const data = useQuery(api.workspaces.getInfoById, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
}
