"use client";

import { RoleBasedGuard } from '@/app/container/RoleBasedGuard';
import React from 'react';

export default function UserPage() {
  return (
    <RoleBasedGuard
      subject="User"
      action="read"
      fallback={<div>You don't have permission to view this page</div>}
    >
      User
    </RoleBasedGuard>
  );
}
