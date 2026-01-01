import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";

export const Route = createFileRoute("/setting")({
  component: AppLayoutComponent,
});

const settingList = [
  {
    name: "General",
    path: "/setting/general",
  },
];

function AppLayoutComponent() {
  return (
    <div className="size-full px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Setting</h1>
      <span className="text-neutral-600 text-sm mt-2">
        Manage your application settings here. Select a category from the sidebar to get started.
      </span>
      <Separator className="my-4" />
      <div className="flex w-full">
        <ul className="w-48">
          {settingList.map((setting) => (
            <li key={setting.path}>
              <Item asChild>
                <Link to={setting.path}>
                  <ItemContent>
                    <ItemTitle>{setting.name}</ItemTitle>
                  </ItemContent>
                </Link>
              </Item>
            </li>
          ))}
        </ul>
        <div className="text-neutral-700 flex-1 ml-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
