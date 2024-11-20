import { MongoAbility } from '@casl/ability';

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type Subjects =
  | 'User'
  | 'Book'
  | 'all'
  | 'manage'
  
export type AppAbility = MongoAbility<[Actions, Subjects]>;
