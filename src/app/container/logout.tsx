"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "http://127.0.0.1:3000/login",
    })
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </button>
  )
}

export default LogoutButton
