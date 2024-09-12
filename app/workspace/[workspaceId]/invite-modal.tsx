import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import useConfirm from "@/hooks/use-confirm";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Copy, RefreshCcw } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface Props {
  inviteOpen: boolean;
  setInviteOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  joinCode: string;
}

export default function InviteModal({
  inviteOpen,
  setInviteOpen,
  name,
  joinCode,
}: Props) {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and generate a new one"
  );
  const { mutate, isPending } = useNewJoinCode();
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite Link copied to clipboard"));
  };
  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(
      { workspaceId },
      {
        onSuccess() {
          toast.success("New code regenerated");
        },
        onError() {
          toast.error("Failed to regenerate new code");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest">{joinCode}</p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              Copy Link
              <Copy className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isPending}
              onClick={handleNewCode}
              variant="outline"
            >
              New Code <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
