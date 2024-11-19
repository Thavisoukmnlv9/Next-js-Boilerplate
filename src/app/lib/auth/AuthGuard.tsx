"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const guestRoutes = ["/login", "/register"];
    useEffect(() => {
        const isGuestRoute = guestRoutes.includes(pathname);
        setLoading(true);
        if (status === "loading") return;
        if (status === "authenticated" && isGuestRoute) {
            router.push("/");
        } else if (status === "unauthenticated" && !isGuestRoute) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [pathname, status]);

    return loading ? <div>Loading...</div> : <>{children}</>;
}
