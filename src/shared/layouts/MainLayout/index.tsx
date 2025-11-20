import Sidebar from "@components/Sidebar";
import { Outlet, useMatches } from "react-router";

const MainLayout = () => {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  
  const title = (currentMatch?.handle as { title?: string })?.title || "Dashboard";

  return (
    <div className="flex gap-4">
        <Sidebar />
        <div className="flex-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div >
                <Outlet />
            </div>
        </div>
    </div>
  )
};

export default MainLayout;