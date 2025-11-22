import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";
import Button from "../Button";
import PaginationItem from "./components/PaginationItem";
import type { PaginationProps } from "./types";


const Pagination = (props: PaginationProps) => {
    const { totalPages, currentPage, itemsPerPage, onPageChange, onChangeItemsPerPage, onPreviousPage, onNextPage } = props;

    const renderTotalPages = useMemo(() => {
        if (totalPages > 5) {
            const firstFivePages = Array.from({ length: 5 }, (_, index) => index + 1);
            return firstFivePages.map((page) => (
                <PaginationItem key={page} page={page} isActive={page === currentPage} onClick={() => onPageChange(page)} />
            ));
        } else {
            return Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page} page={page} isActive={page === currentPage} onClick={() => onPageChange(page)} />
            ));
        }
    }, [totalPages, currentPage]);
    return (
        <div className="flex items-center justify-between">
            <div>
                <span className="text-sm text-gray-500">
                    Showing {currentPage} to {totalPages}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={onPreviousPage}>
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                {renderTotalPages}
                <Button variant="ghost" onClick={onNextPage}>
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                    {itemsPerPage} items per page
                </span>
                <select className="rounded-lg border border-gray-300 p-2" value={itemsPerPage} onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    )
}

export default Pagination;