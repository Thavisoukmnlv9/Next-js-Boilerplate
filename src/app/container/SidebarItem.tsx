"use client";

import { useAbility } from "@/app/lib/ability/context";
import Link from "next/link";
import { ReactNode } from "react";
import { Actions, Subjects } from "../setting/interface";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  subject: Subjects;
  action: Actions;
}

export function SidebarItem({
  href,
  icon,
  label,
  subject,
  action,
}: SidebarItemProps) {
  const ability = useAbility();
  if (!ability.can(action, subject)) {
    return null;
  }
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    >
      {icon}
      {label}
    </Link>
  );
}
