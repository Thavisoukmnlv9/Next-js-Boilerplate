export type RoleLabels = {
    staff: string;
    admin: string;
  };
export interface IUser {
    id: number;
    tel: string;
    email: string | null;
    password: string;
    role: RoleLabels;
    fullName: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    index: number;
  }
  
export interface IUserData {
  status: string;
  data: IUser
}