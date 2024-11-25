"use client";
import useUsers from "./hook";
import { DataTable } from "@ui/components/table/data-table";
import { columns } from "@app/(protected)/user/container/columns";
import { RoleBasedGuard } from "@app/lib/ability/roleBasedGuard";
import { Breadcrumb, BreadcrumbItem, Layout, UserNav } from "@app/ui/containers";
import ThemeSwitch from "@app/ui/containers/theme/theme-switch";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const items = [
  { title: 'Extra Components', href: '/extra-components' }
].map(({ href, title }) => (
  <BreadcrumbItem key={title}>
    {href ? (
      <Link
        className='text-muted-foreground underline decoration-muted-foreground decoration-dashed underline-offset-4 hover:text-foreground hover:decoration-solid'
        href={href}
      >
        {title}
      </Link>
    ) : (
      <span className='text-muted-foreground'>{title}</span>
    )}
  </BreadcrumbItem>
))

export default function UserPage() {


  const { users, pagination, setPagination, meta, setSearch, } = useUsers();
  return (
    <>
      <RoleBasedGuard subject="User" action="read" fallback={<div>You don't have permission to view this page</div>} >
        <Layout>
          <Layout.Header>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <UserNav />
            </div>
          </Layout.Header>
          <Layout.Body>
            <div className="pl-4 space-y-2 ">
              <div className="mb-2flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    ຍິນດີຕ້ອນຮັບ!
                  </h2>
                  <p className="text-muted-foreground">
                    ນີ້ແມ່ນລາຍຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ!
                  </p>
                </div>
              </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              <div className="space-y-4 p-4">
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
            </div>
          </Layout.Body>
        </Layout>
      </RoleBasedGuard>
    </>
  );
}

