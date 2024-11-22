export type Role = 'admin' | 'staff'

export interface UserCredentials {
    tel: string;
    password: string;
}

export interface BackendUser {
    id: string;
    fullName: string;
    roles: Role[];
    tel: string;
}

export interface AuthResponse {
    user: BackendUser;
    accessToken: string;
    refreshToken: string;
}

export interface CustomUser {
    tel: string;
    fullName: string;
    id: string;
    roles: Role[];
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;
    email: string;
    roles: Role[];
}

export interface AuthorizationResult {
    authorized: boolean;
    message?: string;
}

