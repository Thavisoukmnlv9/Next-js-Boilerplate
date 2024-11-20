"use client"

import { Users, Settings, Home, FileText, BarChart2, Building } from 'lucide-react';
import { useAbility } from '@/app/lib/ability/AbilityContext';
import { Actions, Subjects } from '../lib/ability/ability';
import { SidebarItem } from './SidebarItem';
import LogoutButton from './logout';

export function Sidebar() {
  const ability = useAbility();

  const menuItems = [
    {
      href: '/',
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
      subject: 'Dashboard' as Subjects,
      action: 'read' as Actions
    },
    {
      href: '/user',
      icon: <Users className="h-5 w-5" />,
      label: 'Users',
      subject: 'User' as Subjects,
      action: 'read' as Actions
    },
    {
      href: '/organization',
      icon: <Building className="h-5 w-5" />,
      label: 'Organization',
      subject: 'Organization' as Subjects,
      action: 'read' as Actions
    },
    {
      href: '/reports',
      icon: <FileText className="h-5 w-5" />,
      label: 'Reports',
      subject: 'Report' as Subjects,
      action: 'read' as Actions
    },
    {
      href: '/analytics',
      icon: <BarChart2 className="h-5 w-5" />,
      label: 'Analytics',
      subject: 'Dashboard' as Subjects,
      action: 'read' as Actions
    },
    {
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      subject: 'Settings' as Subjects,
      action: 'read' as Actions
    }
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-900">
      <div className="flex flex-1 flex-col space-y-4 p-4">
        {menuItems.map((item) => (
          ability.can(item.action, item.subject) && (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              subject={item.subject}
              action={item.action}
            />
          )
        ))}
        <LogoutButton/>
      </div>
    </div>
  );
}