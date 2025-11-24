import { Link, useLocation } from "react-router";
import { memo } from "react";

type SidebarItemProps = {
  title: string;
  path: string;
}

const SidebarItem = ({ title, path }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link to={path} className={`flex items-center hover:bg-blue-100 py-4 px-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}>
        <h1>{title}</h1>
    </Link>
  )
}

export default memo(SidebarItem);