"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "./lib/auth/guard";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <html lang="en">
            <body>
                <AuthGuard>{children}</AuthGuard>
            </body>
            </html>
        </SessionProvider>
    );
}
