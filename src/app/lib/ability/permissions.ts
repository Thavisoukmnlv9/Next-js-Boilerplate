import { Role } from '../auth/interface';
import { Actions, Subjects } from './interface';

export const rolePermissions: Record<Role, { action: Actions; subject: Subjects | Subjects[]; conditions?: Record<string, unknown> }[]> = {
  ADMIN: [{ action: 'manage', subject: 'all' }],
  MANAGER: [
    { action: 'read', subject: ['User'] },
    { action: 'create', subject: ['User'] },
    { action: 'update', subject: ['User'] },
    { action: 'delete', subject: ['User'] }
  ],
};
