"use client";

import { useGetChannelById } from "@/features/channels/api/use-get-channel";
import useChannelId from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import ChannelHeader from "./header";
import ChatInput from "./chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

export default function ChannelIdPage() {
  const channelId = useChannelId();
  const { data: channel, isLoading: channelLoading } = useGetChannelById({
    channelId,
  });
  const { results } = useGetMessages({ channelId });
  console.log({ results });

  if (channelLoading) {
    return (
      <div className="h-full flex flex-1 items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!channel) {
    return (
      <div className="h-full flex flex-col gap-y-2 flex-1 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ChannelHeader title={channel.name} />
      <div className="flex-1" />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
}
