"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true 
}: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (status === "loading") return;
    if (requireAuth) {
      if (status === "unauthenticated" && !isPublicRoute) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } else if (status === "authenticated" && isPublicRoute) {
        router.push("/user");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [pathname, status, requireAuth, isPublicRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}