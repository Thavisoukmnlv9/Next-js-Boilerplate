"use client";
import React from "react";
import ThemeSwitch from "../../../shadcn/theme-switch";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import useUsers from "./hook";

export default function UserPage() {
  const { users, loading, error, pagination, setPagination, meta, search, setSearch } = useUsers();
  return (
    <div className="p-4 space-y-4">
      <ThemeSwitch />
      <DataTable
        columns={columns}
        setSearch={setSearch}
        data={users}
        pagination={{
          pageIndex: pagination.page - 1,
          pageSize: pagination.limit,
          totalItems: meta.totalCount,
        }}
        onPaginationChange={(newPagination) => {
          setPagination({
            page: newPagination.pageIndex + 1,
            limit: newPagination.pageSize,
          });
        }}
      />
    </div>
  );
}
