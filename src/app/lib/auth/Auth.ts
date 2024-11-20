import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import $axios from "../Axios";
import { AuthResponse, CustomUser, UserCredentials } from "./interface";

async function login(credentials: UserCredentials): Promise<CustomUser> {
    try {
        const response = await $axios.post<AuthResponse>("/boilerplate/v1/login", {
            tel: credentials.tel,
            password: credentials.password
        });
        const { user, accessToken, refreshToken } = response.data;
        return {
            tel: user.tel,
            fullName: user.fullName,
            id: user.id,
            role: user.role,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: any) {
            if (token.user) {
                session.user = {
                    fullName: token.user.fullName,
                    tel: token.user.tel,
                    id: token.user.id,
                    role: token.user.role
                }
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

export function getLogout() {
    return async() => {
      await signOut({
        redirect: true,
        redirectTo: "/login",
      });
      return {
        success: true,
      };
    };
  }
  
export const { handlers, auth, signIn, signOut } = NextAuth(config);
