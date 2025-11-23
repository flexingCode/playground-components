import Input from "@/shared/components/Input"
import { SearchIcon } from "lucide-react";

type SearchProductSectionProps = {
    searchValue: string;
    onSearchChange: (value: string) => void;
}

const SearchProductSection = (props: SearchProductSectionProps) => {
    const { searchValue, onSearchChange } = props;
    return (
        <div>
            <Input 
                icon={<SearchIcon className="w-4 h-4 text-gray-500" />}
                iconPosition="left"
                value={searchValue}
                onTextChange={onSearchChange} 
                placeholder="Search product name" 
                type="text" />
        </div>  
    )
}

export default SearchProductSection;