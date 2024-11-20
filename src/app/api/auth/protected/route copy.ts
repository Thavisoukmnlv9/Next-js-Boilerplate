import { checkPermission } from '@/app/lib/auth/casbin';
import { useSession } from "next-auth/react";
import { NextResponse } from 'next/server';



export async function GET(request: Request) {
    const { data: session } = useSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const hasPermission = await checkPermission(
    session.user.role,
    '/api/auth/protected', 
    'GET'
  );

  if (!hasPermission) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ data: 'Protected data' });
}