"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export default function useWorkspaceId() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return workspaceId as Id<"workspaces">;
}
