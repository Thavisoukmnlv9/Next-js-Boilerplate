"use client";

import React from "react";
import useUsers from "./hook";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import ThemeSwitch from "../../../shadcn/theme-switch";
import { useState } from "react";

export default function UserPage() {
  const { users, loading, error, pagination, setPagination, meta, search, setSearch } = useUsers();
  return (
    <div className="p-4 space-y-4">
       <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 border rounded text-black"
      />
      <DataTable
          columns={columns}
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
