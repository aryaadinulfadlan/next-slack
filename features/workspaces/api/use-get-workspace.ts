"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  id: Id<"workspaces">;
}
export default function useGetWorkspace({ id }: Props) {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
}
