import { ReactNode } from "react";
import Toolbar from "./toolbar";

export default function WorkspaceIdLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
}
