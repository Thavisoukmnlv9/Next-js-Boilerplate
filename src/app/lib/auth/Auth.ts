import type { NextAuthConfig, Session } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import $fetchClient from "./fetchClient"
import { AuthResponse, CustomUser, Role, UserCredentials } from "./interface"

interface SessionUser {
  fullName: string
  tel: string
  id: string
  roles: Role[]
  accessToken: string
  email: string
}

declare module "next-auth" {
  interface Session {
    user?: SessionUser
  }
}

async function login(credentials: UserCredentials): Promise<CustomUser> {
  try {
    const response = await $fetchClient.post<AuthResponse>(
      "/boilerplate/v1/login",
      {
        tel: credentials.tel,
        password: credentials.password,
      }
    )
    const { user, accessToken, refreshToken } = response.data
    return {
      tel: user.tel,
      fullName: user.fullName,
      id: user.id,
      roles: user.roles,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  } catch (e: unknown) {
    console.error("Login failed:", e)
    throw new Error("Login failed.")
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
          placeholder: "Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        return login(credentials as UserCredentials)
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token.user) {
        session.user = {
          fullName: token.user.fullName,
          tel: token.user.tel,
          id: token.user.id,
          roles: token.user.roles,
          email: token.user.email,
          accessToken: token.user.accessToken,
        }
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
