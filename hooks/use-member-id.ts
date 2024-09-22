"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export default function useMemberId() {
  const { memberId } = useParams<{ memberId: string }>();
  return memberId as Id<"members">;
}
