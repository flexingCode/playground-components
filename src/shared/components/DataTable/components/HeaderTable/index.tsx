import Checkbox from "@/shared/components/Checkbox";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";
import type { TableColumn } from "../../types";

type SortDirection = "desc" | "asc" | null;

type SortState<T> = {
    column: TableColumn<T> | null;
    direction: SortDirection;
};

type HeaderTableProps<T> = {
    columns: TableColumn<T>[]
    onSortColumn?: (column: TableColumn<T>) => void;
    sortState?: SortState<T>;
    multiSelect?:boolean;
    onSelectedAllRows?: () => void;
    onUnselectedAllRows?: () => void;
    currentPage?: number;
}

const HeaderTable = <T,>(props: HeaderTableProps<T>) => {
    const { columns, onSortColumn, sortState, multiSelect, onSelectedAllRows, onUnselectedAllRows, currentPage = 1 } = props;
    const [isAllSelected, setIsAllSelected] = useState(false);


    const isSortable = (column: TableColumn<T>) => {
        return column.sortable !== false;
    };

    const getSortIcon = (column: TableColumn<T>) => {
        if (!sortState || sortState.column?.key !== column.key) {
            return null;
        }

        if (sortState.direction === "desc") {
            return <ChevronUp className="absolute w-4 h-4  right-0" />;
        }
        if (sortState.direction === "asc") {
            return <ChevronDown className="absolute w-4 h-4  right-0" />;
        }
        return null;
    };

    const handleChangeCheckbox = (checked: boolean) => {
        if (checked) {
            onSelectedAllRows?.();
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
            onUnselectedAllRows?.();
        }
    };

    return (
        <thead className="bg-blue-100">
            <tr>
                {multiSelect && (
                    <th className="text-blue-500 py-3 px-4 font-medium">
                        <Checkbox key={`checkbox-page-${currentPage}`} checked={isAllSelected} onChange={handleChangeCheckbox} />
                    </th>
                )}
                {columns.map((column) => {
                    const sortable = isSortable(column);
                    const isActive = sortState?.column?.key === column.key;
                    
                    return (
                        <th 
                            key={`data-table-header-${column.key}`} 
                            className={`text-blue-500 py-3 px-4 font-medium ${
                                sortable ? "cursor-pointer hover:bg-blue-200 select-none" : ""
                            } ${isActive ? "bg-blue-200" : ""}`}
                            onClick={() => sortable && onSortColumn?.(column)}
                        >
                            <div className="flex items-center justify-between relative">
                                {column.label}
                                {getSortIcon(column)}
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>)
}

export default HeaderTable;