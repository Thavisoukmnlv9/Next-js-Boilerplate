import { Role } from '../lib/auth/interface';
import { Actions, Subjects } from './interface';

export const rolePermissions: Record<Role, { action: Actions; subject: Subjects | Subjects[] }[]> = {
  admin: [{ action: 'manage', subject: 'all' }],
  staff: [
    { action: 'read', subject: 'User' },
    { action: 'read', subject: 'product' },
  ],
};

