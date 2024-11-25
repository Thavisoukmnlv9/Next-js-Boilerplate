import {
  UserIcon,
  PackageIcon,
  ShoppingCartIcon,
  Settings
} from 'lucide-react';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface IResources extends NavLink {
  sub?: NavLink[];
}

export const resources: IResources[] = [
  {
    title: 'ຜູ້ໃຊ້ງານລະບົບ', 
    href: '/user',
    icon: <UserIcon size={18} />,
  },
  {
    title: 'ຕັ້ງຄ່າ', 
    href: '/setting',
    icon: <Settings size={18} />,
  },
  {
    title: 'ຕົວຢ່າງ submenu',
    href: '/submenu',
    icon: <PackageIcon size={18} />,
    sub: [
      {
        title: 'ສິນຄ້າ',
        href: '/products',
        icon: <PackageIcon size={18} />,
      },
      {
        title: 'ອໍເດີ',
        href: '/',
        icon: <ShoppingCartIcon size={18} />,
      },
    ],
  },
];
