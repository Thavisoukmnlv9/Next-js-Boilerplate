"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Package, User, Box, Gauge, Settings, LogOut } from "lucide-react";
import LogoutButton from "./logout";

const menuItems = [
  { name: "Dashboard", icon: Gauge, href: "/dashboard", resource: "dashboard", action: "read" },
  { name: "Users", icon: User, href: "/user", resource: "user", action: "read" },
  { name: "Orders", icon: Package, href: "/order", resource: "order", action: "read" },
  { name: "Products", icon: Box, href: "/product", resource: "product", action: "read" },
  { name: "Settings", icon: Settings, href: "/settings", resource: "settings", action: "read" },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const [accessibleResources, setAccessibleResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function checkPermissions() {
      try {
        const permissions = await Promise.all(
          menuItems.map(async (item) => {
            const response = await fetch("/api/access/check", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                resource: item.resource,
                action: item.action,
              }),
            });

            if (!response.ok) {
              console.error(`Failed to check permissions for ${item.resource}:`, response.statusText);
              return null;
            }

            const { can } = await response.json();
            return can ? item.resource : null;
          })
        );

        setAccessibleResources(
          new Set(permissions.filter((resource): resource is string => resource !== null))
        );
      } catch (error) {
        console.error("Error checking permissions:", error);
      }
    }

    if (session) {
      checkPermissions();
    }
  }, [session]);

  return (
    <div className="w-64 bg-white border-r h-full fixed left-0 top-0 pt-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const MenuItemIcon = item.icon;
            if (!accessibleResources.has(item.resource)) return null;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <MenuItemIcon className="mr-3" size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center p-2 hover:bg-gray-100 rounded-md transition"
            >
              <LogOut className="mr-3" size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      <LogoutButton/>
    </div>
  );
}