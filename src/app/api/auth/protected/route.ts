import { auth } from "@/app/lib/auth/auth";

export const GET = auth((req) => {
    if (req.auth) {
        return Response.json({ data: "Protected data" });
    }
    return Response.json({ message: "Not authenticated" }, { status: 401 });
}) as unknown;
