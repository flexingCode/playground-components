import Avatar from "@/shared/components/Avatar";
import DataTable from "@/shared/components/DataTable";
import type { DataTableProps } from "@/shared/components/DataTable/types";
import type { User } from "@/types/user";
import users from "@data/users.json";
import { useEffect, useMemo, useState } from "react";

const DataTableScreen = () => {
  const [paginatedData, setPaginatedData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(Math.ceil(users.length / itemsPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / itemsPerPage));
  }, [itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setPaginatedData(users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [currentPage, itemsPerPage]);

  const tableData: DataTableProps<User> = useMemo(() => ({
    data: users,
    columns: [
      {
        key: "id",
        label: "ID",
        accessor: (row) => row.id.toString(),
        sortValue: (row) => row.id
      },
      {
        key: "user",
        label: "User",
        accessor: (row) => (
          <div className="flex items-center gap-2">
            <Avatar name={row.name} />
            <div className="flex flex-col">
              <h1 className="text-sm font-medium">{row.name}</h1>
              <p className="text-xs text-gray-500">{row.email}</p>
            </div>
          </div>
        ),
        sortValue: (row) => row.name.toLowerCase()
      },
      {
        key: "age",
        label: "Age",
        accessor: (row) => row.age,
        sortValue: (row) => row.age
      },
      {
        key: "status",
        label: "Status",
        accessor: (row) => row.status,
        sortValue: (row) => row.status.toLowerCase()
      },
    ],
  }), [])

  return (
    <div >
      <DataTable 
        data={paginatedData} 
        columns={tableData.columns} 
        exportable 
        multiSelect
        pagination={{
          totalPages,
          currentPage,
          itemsPerPage,
          onPageChange: setCurrentPage,
          onChangeItemsPerPage: setItemsPerPage,
          onPreviousPage: handlePreviousPage,
          onNextPage: handleNextPage
        }}
      />
    </div>
  );
};

export default DataTableScreen;