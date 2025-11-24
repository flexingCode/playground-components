import { memo } from "react";
import SidebarItem from "./components/SidebarItem";

const Sidebar = () => {
  return (
    <div className="h-screen w-72 shadow-md p-4">
      <div className=" h-24 w-full flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-500">
          Playground Complex Components
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <SidebarItem title="Data Table" path="/" />
        <SidebarItem title="Form Builder" path="/form-builder" />
        <SidebarItem title="Infinity Scroll" path="/infinity-scroll" />
        <SidebarItem title="Multistep" path="/multistep" />
      </div>
    </div>
  )
};

export default memo(Sidebar);