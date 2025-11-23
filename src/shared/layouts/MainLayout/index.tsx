import Sidebar from "@components/Sidebar";
import { Outlet, useMatches } from "react-router";

const MainLayout = () => {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  
  const title = (currentMatch?.handle as { title?: string })?.title || "Dashboard";

  return (
    <div className="flex gap-4 h-screen">
        <Sidebar />
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
            <h1 className="text-2xl font-bold shrink-0">{title}</h1>
            <div className="mt-4 flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    </div>
  )
};

export default MainLayout;