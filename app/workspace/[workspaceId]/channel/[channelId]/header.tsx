import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import useCurrentMember from "@/features/members/api/use-current-member";
import useChannelId from "@/hooks/use-channel-id";
import useConfirm from "@/hooks/use-confirm";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  title: string;
}
export default function ChannelHeader({ title }: Props) {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(title);
  const { replace } = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this channel?",
    "This action is irreversible"
  );
  const { data: currentMember } = useCurrentMember({ workspaceId });

  const { mutate: updateChannel, isPending: updatingChannel } =
    useUpdateChannel();
  const { mutate: removeChannel, isPending: removingChannel } =
    useRemoveChannel();

  const handleEditOpenChange = (value: boolean) => {
    if (currentMember?.role !== "admin") return;
    setEditOpen(value);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel(
      { channelId, name: value },
      {
        onSuccess() {
          toast.success("Channel Updated");
          setEditOpen(false);
        },
        onError() {
          toast.error("Failed to update channel");
        },
      }
    );
  };
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;
    removeChannel(
      { channelId },
      {
        onSuccess() {
          toast.success("Channel Removed");
          replace(`/workspace/${workspaceId}`);
        },
        onError() {
          toast.error("Failed to remove channel.");
        },
      }
    );
  };
  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-0 bg-gray-50 overflow-hidden"
          aria-describedby={undefined}
        >
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel name</p>
                    {currentMember?.role === "admin" && (
                      <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm"># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <Input
                    value={value}
                    disabled={updatingChannel}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={50}
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={updatingChannel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={updatingChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {currentMember?.role === "admin" && (
              <button
                disabled={removingChannel}
                onClick={handleRemove}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              >
                <Trash className="size-4" />
                <p className="text-sm font-semibold">Delete Channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
