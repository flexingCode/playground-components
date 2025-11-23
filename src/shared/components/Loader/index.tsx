import { LoaderCircle } from "lucide-react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full gap-2">
            <LoaderCircle className="animate-spin color-blue-500" />
            <p className="text-gray-500 text-sm">Loading...</p>
        </div>
    );
};

export default Loader;