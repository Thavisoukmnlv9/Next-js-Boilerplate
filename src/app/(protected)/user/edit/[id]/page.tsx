"use client";

import { RoleBasedGuard } from "@app/lib/ability";
import { Layout, UserNav } from "@app/ui/containers";
import ThemeSwitch from "@app/ui/containers/theme/theme-switch";
import { UserEditForm } from "../../container/form";

export default function EditAbout({ params }: { params: { id: number } }) {
  const id = Number(params.id);
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
                    ແກ້ໄຂ
                  </h2>
                  <p className="text-muted-foreground">
                    ຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ!
                  </p>
                </div>
              </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              <div className="space-y-4 p-4">
              <UserEditForm id={id}/>
              </div>
            </div>
          </Layout.Body>
        </Layout>
      </RoleBasedGuard>
    </>
  )
}