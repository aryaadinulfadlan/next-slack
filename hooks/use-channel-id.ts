"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export default function useChannelId() {
  const { channelId } = useParams<{ channelId: string }>();
  return channelId as Id<"channels">;
}
