import React from 'react';
import AuthGuard from '@/app/lib/auth/guard';

export default function Home({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}