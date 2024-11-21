"use client";

import { useAbility } from "@/app/lib/ability/context";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Actions, Subjects } from "../lib/ability/interface";

interface RoleBasedGuardProps {
  children: ReactNode;
  subject: Subjects;
  action: Actions;
  fallback?: ReactNode;
}

export function RoleBasedGuard({
  children,
  subject,
  action,
  fallback,
}: RoleBasedGuardProps) {
  const ability = useAbility();
  if (!ability.can(action, subject)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect("/unauthorized");
  }
  return <>{children}</>;
}
