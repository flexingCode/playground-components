import type { PaginationProps } from "../Pagination/types";

type DataTableProps<T>= {
    data: T[];
    columns: TableColumn<T>[];
    exportable?: boolean;
    isLoading?: boolean;
    pagination?: PaginationProps;
    multiSelect?: boolean;
}

type TableColumn<T> = {
    key: string;
    label: string;
    accessor: (row: T) => React.ReactNode;
    sortable?: boolean;
    width?: number;
    align?: 'left' | 'center' | 'right';
    sortValue?: (row: T) => string | number;
}


export type { DataTableProps, TableColumn };