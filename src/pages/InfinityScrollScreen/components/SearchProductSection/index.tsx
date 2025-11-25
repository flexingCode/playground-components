import Input from "@/shared/components/Input"
import { SearchIcon } from "lucide-react";
import brands from '@data/brands.json'
import FormControlSelect from "@/shared/components/FormControlSelect";

type SearchProductSectionProps = {
    searchValue: string;
    brandValue: string;
    onSearchChange: (value: string) => void;
    onBrandChange: (value: string) => void;
}

const brandOptions =[{
    label: "All",
    value: "",
}, ...brands.map((brand) => ({
    label: brand,
    value: brand,
}))];



const SearchProductSection = (props: SearchProductSectionProps) => {
    const { searchValue, brandValue, onSearchChange, onBrandChange } = props;

    return (
        <div className="flex flex-col gap-4">
            <Input 
                icon={<SearchIcon className="w-4 h-4 text-gray-500" />}
                iconPosition="left"
                value={searchValue}
                onTextChange={onSearchChange} 
                placeholder="Search product name" 
                type="text" />
            <div>
                <FormControlSelect
                    options={brandOptions}
                    value={brandValue}
                    onTextChange={onBrandChange}
                    placeholder="Search by brand"
                    label="Filter by brand"
                />
            </div>
        </div>  
    )
}

export default SearchProductSection;