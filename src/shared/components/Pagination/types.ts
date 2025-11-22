type PaginationProps = {
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onChangeItemsPerPage: (itemsPerPage: number) => void;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

export type { PaginationProps };