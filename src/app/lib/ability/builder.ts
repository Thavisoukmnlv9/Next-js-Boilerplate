import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { rolePermissions } from './permissions';
import { AppAbility, Actions, Subjects } from './interface';
import { Role } from '../auth/interface';

function parseConditions(conditions: Record<string, unknown>, userId: string): Record<string, unknown> {
  return JSON.parse(
    JSON.stringify(conditions).replace('${user.id}', userId)
  );
}

function handleSubject(
    action: Actions,
    subject: Subjects,
    conditions: Record<string, unknown> | undefined,
    can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void
  ) {
    can(action, subject, conditions);
  }
  
  function handlePermission(
    permission: { action: Actions; subject: Subjects | Subjects[]; conditions?: Record<string, unknown> },
    userId: string,
    can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void
  ) {
    const conditions = permission.conditions ? parseConditions(permission.conditions, userId) : undefined;
  
    if (Array.isArray(permission.subject)) {
      permission.subject.forEach(subject => handleSubject(permission.action, subject, conditions, can));
    } else {
      handleSubject(permission.action, permission.subject, conditions, can);
    }
  }
  
  function applyPermissions(
    roles: Role[],
    userId: string,
    can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void
  ) {
    roles.forEach(role => {
      const permissions = rolePermissions[role];
      if (permissions) {
        permissions.forEach(permission => handlePermission(permission, userId, can));
      }
    });
  }
  
export function defineAbilityFor(roles: Role[], userId: string): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  applyPermissions(roles, userId, can);
  return build();
}
