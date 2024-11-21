"use client";
import React from "react";
import AuthGuard from "@/app/lib/auth/guard";
import { AbilityProvider } from "../lib/ability/provider";
import { Sidebar } from "../container/sidebar";
import { Layout } from "../../shadcn/custom/layout";
import { ThemeProvider } from "../../shadcn/theme-provider";
import ThemeSwitch from "../../shadcn/theme-switch";
import AppShell from "../../shadcn/app-shell";

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
