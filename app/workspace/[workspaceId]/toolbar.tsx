"use client";

import { Button } from "@/components/ui/button";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { useGetChannelsByWorkspaceId } from "@/features/channels/api/use-get-channels";
import useGetMembersByWorkspaceIdIncludeRelatedUser from "@/features/members/api/use-get-members";
import { useRouter } from "next/navigation";

export default function Toolbar() {
  const workspaceId = useWorkspaceId();
  const { push } = useRouter();
  const { data, isLoading } = useGetWorkspace({ id: workspaceId });
  const [open, setOpen] = useState(false);
  const { data: channels } = useGetChannelsByWorkspaceId({ workspaceId });
  const { data: members } = useGetMembersByWorkspaceIdIncludeRelatedUser({
    workspaceId,
  });

  const onChannelClick = (channelId: string) => {
    setOpen(false);
    push(`/workspace/${workspaceId}/channel/${channelId}`);
  };
  const onMemberClick = (memberId: string) => {
    setOpen(false);
    push(`/workspace/${workspaceId}/member/${memberId}`);
  };
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {channels?.map((channel) => (
                <CommandItem
                  key={channel._id}
                  onSelect={() => onChannelClick(channel._id)}
                >
                  {channel.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              {members?.map((member) => (
                <CommandItem
                  key={member._id}
                  onSelect={() => onMemberClick(member._id)}
                >
                  {member.user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSmall">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
}
