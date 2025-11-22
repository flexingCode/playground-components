import { Link } from "react-router";

type SidebarItemProps = {
  title: string;
  path: string;
  isActive: boolean;
}
const SidebarItem = ({ title, path, isActive }: SidebarItemProps) => {
  return (
    <Link to={path} className={`flex items-center hover:bg-blue-100 py-4 px-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}>
        <h1>{title}</h1>
    </Link>
  )
}

export default SidebarItem;