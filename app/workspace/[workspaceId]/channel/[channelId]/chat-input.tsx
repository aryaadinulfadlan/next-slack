import { EditorValue } from "@/components/editor";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import useChannelId from "@/hooks/use-channel-id";
import useWorkspaceId from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Props {
  placeholder: string;
}

export default function ChatInput({ placeholder }: Props) {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const { mutate: createMessage } = useCreateMessage();
  const handleSubmit = async ({ body, image }: EditorValue) => {
    console.log({ body, image });
    try {
      setIsPending(true);
      await createMessage(
        { workspaceId, channelId, body },
        { throwError: true }
      );
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
}
