"use client";

import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceInfo from "@/features/workspaces/api/use-get-workspace-info";
import { Loader } from "lucide-react";
import { useJoin } from "@/features/workspaces/api/use-join";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function JoinPage() {
  const workspaceId = useWorkspaceId();
  const { replace } = useRouter();
  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });
  const { mutate, isPending } = useJoin();
  const handleComplete = (value: string) => {
    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess(workspaceID) {
          replace(`/workspace/${workspaceID}`);
          toast.success("Workspace Joined!");
        },
        onError() {
          toast.error("Failed to join workspace");
        },
      }
    );
  };
  useEffect(() => {
    if (data?.isMember) {
      replace(`/workspace/${workspaceId}`);
    }
  }, [data?.isMember, workspaceId]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src="/logo.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-sm text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onComplete={handleComplete}
          autoFocus
          disabled={isPending}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
