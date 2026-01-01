import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export interface AppSideBarProps {
  children: React.ReactNode;
}

export default function AppSideBar(props: AppSideBarProps) {
  const navigate = useNavigate();

  return (
    <aside className="w-(--app-sidebar-width) h-full border-r flex flex-col">
      <div>{props.children}</div>
      <div className="w-full mt-auto py-3 px-2 border-t">
        <Button className="w-full cursor-pointer" onClick={() => navigate({ to: "/" })}>
          <Plus />
          New Chat
        </Button>
      </div>
    </aside>
  );
}
