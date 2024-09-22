import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight } from "lucide-react";

interface Props {
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
  threadName?: string;
  onClick?: () => void;
}

export default function ThreadBar({
  threadCount,
  threadImage,
  threadTimestamp,
  threadName = "Member",
  onClick,
}: Props) {
  const avatarFallback = threadName.charAt(0).toUpperCase();
  if (!threadCount || !threadTimestamp) return null;
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src={threadImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 hover:underline font-bold truncate">
          {`${threadCount} ${threadCount > 1 ? "replies" : "reply"}`}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:hidden block">
          Last reply {formatDistanceToNow(threadTimestamp, { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
          View thread
        </span>
      </div>
      <ChevronRight className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 transition shrink-0" />
    </button>
  );
}
