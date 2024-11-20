"use client"

import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { Role } from '../auth/interface';

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type Subjects = 
  | 'User' 
  | 'Profile' 
  | 'Settings' 
  | 'Report' 
  | 'Dashboard' 
  | 'Organization' 
  | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

const rolePermissions = {
  ADMIN: [
    { action: 'manage', subject: 'all' }
  ],
  MANAGER: [
    { action: 'read', subject: ['User', 'Profile', 'Report', 'Dashboard', 'Organization'] },
    { action: 'create', subject: ['User', 'Profile', 'Report'] },
    { action: 'update', subject: ['User', 'Profile', 'Organization'] },
    { action: 'delete', subject: ['Report'] }
  ],
  USER: [
    { action: 'read', subject: ['Profile', 'Dashboard'] },
    { action: 'update', subject: 'Profile', conditions: { userId: '${user.id}' } }
  ]
} as const;

export function defineAbilityFor(roles: Role[], userId: string) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  roles.forEach(role => {
    const permissions = rolePermissions[role];
    if (permissions) {
      permissions.forEach(permission => {
        if (Array.isArray(permission.subject)) {
          permission.subject.forEach(subject => {
            if (permission.conditions) {
              const conditions = JSON.parse(
                JSON.stringify(permission.conditions).replace('${user.id}', userId)
              );
              can(permission.action as Actions, subject, conditions);
            } else {
              can(permission.action as Actions, subject);
            }
          });
        } else {
          if (permission.conditions) {
            const conditions = JSON.parse(
              JSON.stringify(permission.conditions).replace('${user.id}', userId)
            );
            can(permission.action as Actions, permission.subject, conditions);
          } else {
            can(permission.action as Actions, permission.subject);
          }
        }
      });
    }
  });
  return build();
}
