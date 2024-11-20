"use client";
import { useSession, getSession } from "next-auth/react";

export default function HomePage() {
    const { data: session } = useSession();
    console.log("🚀 ~ HomePage ~ session:", session)
    // const session = getSession();
    // console.log("🚀 ~ GET ~ session:11", session)
    return (
        <div className="text-center text-red-500">
            <h2>Hello Word{}!</h2>
        </div>
    );
}
