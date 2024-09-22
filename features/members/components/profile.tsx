import { Id } from "@/convex/_generated/dataModel";
import useGetMemberById from "../api/use-get-member";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronDown, Loader, Mail, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useUpdateMember } from "../api/use-update-member";
import { useRemoveMember } from "../api/use-remove-member";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useCurrentMember from "../api/use-current-member";
import { toast } from "sonner";
import useConfirm from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  memberId: Id<"members">;
  onClose: () => void;
}
export default function Profile({ memberId, onClose }: Props) {
  const { replace } = useRouter();
  const workspaceId = useWorkspaceId();
  const [LeaveDialog, confirmLeave] = useConfirm(
    "Leave Workspace",
    "Are you sure you want to leave this workspace?"
  );
  const [RemoveDialog, confirmRemove] = useConfirm(
    "Remove Member",
    "Are you sure you want to remove this member?"
  );
  const [UpdateDialog, confirmUpdate] = useConfirm(
    "Change Role",
    "Are you sure you want to change this member's role?"
  );
  const { data: currentMember, isLoading: loadingCurrentMember } =
    useCurrentMember({ workspaceId });
  const { data: member, isLoading: loadingMember } = useGetMemberById({
    memberId,
  });
  const { mutate: updateMember, isPending: updatingMember } = useUpdateMember();
  const { mutate: removeMember, isPending: removingMember } = useRemoveMember();
  const onRemove = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    removeMember(
      {
        memberId,
      },
      {
        onSuccess() {
          // replace("/");
          toast.success("Member removed");
          onClose();
        },
        onError() {
          toast.error("Failed to remove member");
          onClose();
        },
      }
    );
  };
  const onLeave = async () => {
    const ok = await confirmLeave();
    if (!ok) return;
    removeMember(
      {
        memberId,
      },
      {
        onSuccess() {
          replace("/");
          toast.success("You left the workspace");
          // onClose();
        },
        onError() {
          toast.error("Failed to leave the workspace");
          onClose();
        },
      }
    );
  };
  const onUpdate = async (role: "admin" | "member") => {
    const ok = await confirmUpdate();
    if (!ok) return;
    updateMember(
      {
        memberId,
        role,
      },
      {
        onSuccess() {
          toast.success("Role changed");
          onClose();
        },
        onError() {
          toast.error("Failed to change the role");
          onClose();
        },
      }
    );
  };
  if (loadingMember || loadingCurrentMember) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSmall" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSmall" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }
  const avatarFallback = member.user.name?.[0] ?? "M";
  return (
    <>
      <UpdateDialog />
      <LeaveDialog />
      <RemoveDialog />
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSmall" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="max-w-[250px] max-h-[250px] size-full">
            <AvatarImage src={member.user.image} />
            <AvatarFallback className="aspect-square text-[5rem]">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col p-4">
          <p className="text-xl font-bold">{member.user.name}</p>
          {currentMember?.role === "admin" && currentMember._id !== memberId ? (
            <div className="flex items-center gap-2 mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full capitalize">
                    {member.role} <ChevronDown className="size-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as "admin" | "member")
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={onRemove} variant="outline" className="w-full">
                Remove
              </Button>
            </div>
          ) : currentMember?.role !== "admin" &&
            currentMember?._id === memberId ? (
            <div className="mt-4">
              <Button onClick={onLeave} variant="outline" className="w-full">
                Leave
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="text-sm font-bold mb-4">Contact Information</p>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-md bg-muted flex items-center justify-center">
              <Mail className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-muted-foreground">
                Email Address
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-sm hover:underline text-[#1264a3]"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
