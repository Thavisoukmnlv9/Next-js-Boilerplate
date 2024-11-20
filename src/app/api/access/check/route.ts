import { NextRequest, NextResponse } from "next/server";
import { StringAdapter } from "casbin";
import { accessControlProvider } from "@/app/lib/access/control";
import { policies } from "@/app/lib/access/policy";

export async function POST(request: NextRequest) {
  try {
    const session = "ADMIN" // Replace with actual session logic
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, resource, params } = body;
    
    const adapter = new StringAdapter(policies);
    const accessControl = accessControlProvider(adapter);
    const role = "ADMIN" // Replace with actual role logic

    const canAccess = await accessControl.can({ 
      action, 
      resource, 
      params: params || {},
      role 
    });

    return NextResponse.json({ can: canAccess.can });
  } catch (error) {
    console.error("Error in access check:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
