"use client"

import { RoleBasedGuard } from "@/app/container/RoleBasedGuard"
import ComingSoon from "../../../shadcn/coming-soon"

export default function Coming() {
    return (
        <RoleBasedGuard
            subject="User"
            action="read"
            fallback={<div>You don't have permission to view this page</div>}
        >
            <ComingSoon />
        </RoleBasedGuard>
    )
}
