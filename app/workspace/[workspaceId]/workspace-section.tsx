import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface Props {
  children: ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export default function WorkspaceSection({
  children,
  hint,
  label,
  onNew,
}: Props) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
          onClick={toggleShow}
        >
          <FaCaretDown
            className={cn(
              "size-4 -rotate-90 transition-transform duration-300",
              show && "rotate-0"
            )}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparent"
              size="iconSmall"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
            >
              <Plus className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {show && children}
    </div>
  );
}
