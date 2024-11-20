import React from "react";
import AuthGuard from "@/app/lib/auth/guard";
import { AbilityProvider } from "../lib/ability/provider";
import { Sidebar } from "../components/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AbilityProvider>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </AbilityProvider>
    </AuthGuard>
  );
}
