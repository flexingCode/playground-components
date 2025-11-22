import Checkbox from "@/shared/components/Checkbox";
import type { TableColumn } from "../../types";

type BodyTableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    multiSelect?: boolean;
    onSelectedRow?: (row: T) => void;
    onUnselectedRow?: (row: T) => void;
    selectedRows?: T[];
}

const BodyTable = <T,>(props: BodyTableProps<T>) => {
    const { data, columns, multiSelect, onSelectedRow, onUnselectedRow, selectedRows } = props;

    const handleChangeCheckbox = (row: T) => {
        if (selectedRows?.includes(row)) {
            onUnselectedRow?.(row);
        } else {
            onSelectedRow?.(row);
        }
    };

    const isSelected = (row: T) => {
        return selectedRows?.includes(row) || false;
    };

    return (
        <tbody>
            {data.map((row, index) => (
                <tr 
                    key={`data-table-row-${index}`}
                    onClick={() => handleChangeCheckbox(row)}
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer">
                    {multiSelect && (
                        <td className="py-2 px-4 w-10">
                            <Checkbox checked={isSelected(row)} onChange={() => handleChangeCheckbox(row)} />
                        </td>
                    )}
                    {columns.map((column) => (
                        <td
                            key={column.key}
                            className="py-2 px-4">
                            {column.accessor(row)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

export default BodyTable;