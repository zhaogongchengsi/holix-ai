import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export interface AppSideBarProps {
  children: React.ReactNode;
}

export default function AppSideBar(props: AppSideBarProps) {
  return (
    <aside className="w-(--app-sidebar-width) h-full border-r flex flex-col">
      <div className="h-[calc(100vh-var(--app-header-height))]">{props.children}</div>
    </aside>
  );
}
