"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "./lib/auth/guard";
import "./globals.css";
import { Toaster, ToastProvider } from "@/shadcn/elements";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ToastProvider>
            <Toaster />
            <AuthGuard>{children}</AuthGuard>
          </ToastProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
