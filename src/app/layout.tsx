"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

import AuthGuard from "./lib/auth/guard";
import { Toaster, ToastProvider } from "@ui/elements";

import "./globals.css";

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
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
