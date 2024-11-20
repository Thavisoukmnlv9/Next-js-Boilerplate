import React from 'react';
import AuthGuard from '@/app/lib/auth/AuthGuard';
import Sidebar from '../components/sidebar';

export default function ProtectedLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 p-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}