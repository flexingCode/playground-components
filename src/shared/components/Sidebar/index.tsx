import { useLocation } from "react-router";
import SidebarItem from "./components/SidebarItem";
import { useMemo } from "react";

const Sidebar = () => {
  const location = useLocation();
  const isActive = useMemo(() => (path: string) => location.pathname === path, [location.pathname]);
  return (
    <div className="h-screen w-72 shadow-md p-4">
      <div className=" h-24 w-full flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-500">
          Playground Complex Components
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <SidebarItem title="Data Table" path="/" isActive={isActive("/")} />
        <SidebarItem title="Form Builder" path="/form-builder" isActive={isActive("/form-builder")} />
        <SidebarItem title="Infinity Scroll" path="/infinity-scroll" isActive={isActive("/infinity-scroll")} />
        <SidebarItem title="Multistep" path="/multistep" isActive={isActive("/multistep")} />
      </div>
    </div>
  )
};

export default Sidebar;