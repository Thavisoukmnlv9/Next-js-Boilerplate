"use client";

import React from "react";

import { AppShell, ThemeProvider } from "@ui/containers";
import { AbilityProvider } from "../lib/ability/provider";
import AuthGuard from "@app/lib/auth/guard";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AbilityProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </AbilityProvider>
    </AuthGuard>
  );
}