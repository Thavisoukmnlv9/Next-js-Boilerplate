"use client";

import { RoleBasedGuard } from "@/app/container/RoleBasedGuard";
import React from "react";
import { Layout } from "../../../shadcn/custom/layout";
import { ThemeProvider } from "../../../shadcn/theme-provider";
import ThemeSwitch from "../../../shadcn/theme-switch";
import { UserNav } from "../../../shadcn/user-nav";
import useUsers from "./hook";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function UserPage() {
  const { users, loading, error } = useUsers();
  const userDataList = users?.books?.results ?? []
  console.log("userDataList", userDataList);
  return (
    <RoleBasedGuard
      subject="User"
      action="read"
      fallback={<div>You don't have permission to view this page</div>}
    >
      <Layout>
        <Layout.Header sticky>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>
          <div className="mb-2 flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={userDataList} columns={columns} />
          </div>
        </Layout.Body>
      </Layout>
    </RoleBasedGuard>
  );
}
