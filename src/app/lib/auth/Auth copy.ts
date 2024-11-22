import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthResponse, CustomUser, Role, UserCredentials } from "./interface";
import type { Session } from "next-auth";

interface SessionUser {
    fullName: string;
    tel: string;
    id: string;
    roles: Role[];
    accessToken: string;
    email: string;
}

declare module "next-auth" {
    interface Session {
        user?: SessionUser;
    }
}

async function login(credentials: UserCredentials): Promise<CustomUser> {
    const loginUrl = `${process.env.API_BASE_URL}/boilerplate/v1/login`;
    console.log("🚀 ~ login ~ loginUrl:", loginUrl)

    try {
        const response = await fetch("/boilerplate/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tel: credentials.tel,
                password: credentials.password
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AuthResponse = await response.json();
        const { user, accessToken, refreshToken } = data;
        
        return {
            tel: user.tel,
            fullName: user.fullName,
            id: user.id,
            roles: user.roles,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    } catch (e: unknown) {
        console.error("Login failed:", e);
        throw new Error("Login failed.");
    }
}

export const config: NextAuthConfig = {
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                tel: {
                    label: "Telephone",
                    type: "tel",
                    placeholder: "Phone Number"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "******"
                },
            },
            async authorize(credentials) {
                return login(credentials as UserCredentials);
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            if (token.user) {
                session.user = {
                    fullName: token.user.fullName,
                    tel: token.user.tel,
                    id: token.user.id,
                    roles: token.user.roles,
                    email: token.user.email,
                    accessToken: token.user.accessToken
                }
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);