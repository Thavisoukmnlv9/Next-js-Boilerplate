import {
  IconLayoutDashboard,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface IResources extends NavLink {
  sub?: NavLink[]
}

export const resources: IResources[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'comingSoon',
    href: '/comingSoon',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'User Management',
    href: '/user',
    icon: <IconLayoutDashboard size={18} />,
    sub: [
      {
        title: 'View Users',
        href: '/user/view',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Edit Users',
        href: '/user/edit',
        icon: <IconLayoutDashboard size={18} />,
      },
    ],
  },
];
