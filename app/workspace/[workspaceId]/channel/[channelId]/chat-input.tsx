import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Props {
  placeholder: string;
}

export default function ChatInput({ placeholder }: Props) {
  const editorRef = useRef<Quill | null>(null);
  return (
    <div className="px-5 w-full">
      <Editor
        placeholder={placeholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
}