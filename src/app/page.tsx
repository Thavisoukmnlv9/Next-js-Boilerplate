"use client";
import { useSession } from "next-auth/react";

export default function HomePage() {
    const { data: session } = useSession();
    return (
        <div className="text-center text-red-500">
            <h2>Welcome, {session?.user?.name}!</h2>
        </div>
    );
}
