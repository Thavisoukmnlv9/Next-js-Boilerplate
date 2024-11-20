"use client";

import { RoleBasedGuard } from '@/app/components/RoleBasedGuard';
import React from 'react';

export default function UserPage() {
  return (
    <RoleBasedGuard 
      subject="User" 
      action="read"
      fallback={<div>You don't have permission to view this page</div>}
    >
      <div>User management content...</div>
    </RoleBasedGuard>
  );
}
