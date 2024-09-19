import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Props {
  url: string | null | undefined;
}

export default function Thumbnail({ url }: Props) {
  if (!url) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="Message Image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <div className="max-h-[600px]">
          <img
            src={url}
            alt="Message Image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
