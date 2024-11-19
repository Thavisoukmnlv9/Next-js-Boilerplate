export interface UserCredentials {
    tel: string;
    password: string;
}

export interface BackendUser {
    id: string;
    fullName: string;
    role: string;
    tel: string;
}

export interface AuthResponse {
    user: BackendUser;
    accessToken: string;
    refreshToken: string;
}

export interface CustomUser {
    fullName: string;
    tel: string;
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}