import { memo, useMemo, useState } from "react";
import BodyTable from "./components/BodyTable";
import HeaderTable from "./components/HeaderTable";
import type { DataTableProps, TableColumn } from "./types";
import Button from "../Button";
import { DownloadIcon } from "lucide-react";
import Pagination from "../Pagination";
import { downloadExportedCSV } from "@/utils/exportUtils";

type SortDirection = "desc" | "asc" | null;
type SortState<T> = {
    column: TableColumn<T> | null;
    direction: SortDirection;
};

const MemoDownloadIcon = memo(DownloadIcon);
const MemoPagination = memo(Pagination);

const DataTable = <T,>(props: DataTableProps<T>) => {
    const { data, columns, exportable, pagination, multiSelect } = props;
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortState, setSortState] = useState<SortState<T>>({
        column: null,
        direction: null,
    });

    const handleSelectedAllRows = () => {
        setSelectedRows(data);
    };

    const handleUnselectedAllRows = () => {
        setSelectedRows([]);
    };

    const handleSelectedRow = (item: T) => {
        setSelectedRows((prev) => [...prev, item]);
    };

    const handleUnselectedRow = (item: T) => {
        setSelectedRows((prev) => prev.filter((row) => row !== item));
    };

    const handleSort = (column: TableColumn<T>) => {
        if (column.sortable === false) return;

        setSortState((prev) => {
            if (prev.column?.key === column.key) {
                if (prev.direction === "desc") {
                    return { column, direction: "asc" };
                } else if (prev.direction === "asc") {
                    return { column: null, direction: null };
                }
            }
            return { column, direction: "desc" };
        });
    };

    const sortedData = useMemo(() => {
        if (!sortState.column || !sortState.direction) {
            return data;
        }

        const column = sortState.column;
        const direction = sortState.direction;

        const getSortValue = column.sortValue || ((row: T) => {
            const value = column.accessor(row);
            if (typeof value === "string" || typeof value === "number") {
                return value;
            }
            return String(value) || "";
        });

        return [...data].sort((a, b) => {
            const aValue = getSortValue(a);
            const bValue = getSortValue(b);

            let comparison = 0;
            if (aValue < bValue) {
                comparison = -1;
            } else if (aValue > bValue) {
                comparison = 1;
            }

            return direction === "asc" ? comparison : -comparison;
        });
    }, [data, sortState]);

    const handleExport = () => {
        downloadExportedCSV(selectedRows, 'data.csv');
    }
    

    return (
        <div className="flex flex-col gap-4">
            {exportable && (
                <div className="flex justify-end mb-4">
                    <Button variant="primary" onClick={handleExport} disabled={selectedRows.length === 0}>
                        <MemoDownloadIcon className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            )}
            <table className="w-full">
                <HeaderTable
                    columns={columns}
                    onSortColumn={handleSort}
                    sortState={sortState}
                    multiSelect={multiSelect}
                    onSelectedAllRows={handleSelectedAllRows}
                    onUnselectedAllRows={handleUnselectedAllRows}
                    currentPage={pagination?.currentPage}
                />
                <BodyTable
                    data={sortedData}
                    columns={columns}
                    multiSelect={multiSelect}
                    onSelectedRow={handleSelectedRow}
                    onUnselectedRow={handleUnselectedRow}
                    selectedRows={selectedRows}
                />
            </table>
            {pagination && (
                <MemoPagination
                    totalPages={pagination.totalPages}
                    currentPage={pagination.currentPage}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={pagination.onPageChange}
                    onChangeItemsPerPage={pagination.onChangeItemsPerPage}
                    onPreviousPage={pagination.onPreviousPage}
                    onNextPage={pagination.onNextPage}
                />
            )}
        </div>
    )
}

export default DataTable;