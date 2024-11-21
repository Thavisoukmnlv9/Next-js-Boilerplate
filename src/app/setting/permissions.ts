import { Role } from '../lib/auth/interface';
import { Actions, Subjects } from './interface';

export const rolePermissions: Record<Role, { action: Actions; subject: Subjects | Subjects[] }[]> = {
  ADMIN: [{ action: 'manage', subject: 'all' }],
  MANAGER: [
    { action: 'read', subject: 'User' },
    { action: 'read', subject: 'Book' },
    { action: 'read', subject: 'Dashboard' },
    { action: 'read', subject: 'User Management' },
    { action: 'read', subject: 'View Users' },
  ],
};

