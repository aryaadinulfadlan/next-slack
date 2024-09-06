import { ReactNode } from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";

export default function WorkspaceIdLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
