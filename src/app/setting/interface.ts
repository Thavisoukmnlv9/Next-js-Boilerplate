import { MongoAbility } from '@casl/ability';

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type Subjects =
  | 'User'
  | 'all'
  | 'manage'
  | "product"
  | "setting";

  
export type AppAbility = MongoAbility<[Actions, Subjects]>;
