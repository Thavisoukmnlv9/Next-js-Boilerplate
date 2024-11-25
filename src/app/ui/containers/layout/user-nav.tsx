"use client"

import { baseUrl } from "const"
import { signOut, useSession } from "next-auth/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../elements"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {UserInfoLabel()}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {"profile"}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {"settings"}
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {LogoutContainer()}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserInfoLabel() {
  const { data: session } = useSession()
  const { fullName, tel } = session?.user ?? {}
  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{fullName ?? ""}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {tel ?? ""}
        </p>
      </div>
    </DropdownMenuLabel>
  )
}

export default function LogoutContainer() {
  const baseURL = `${baseUrl}/login`

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: baseURL,
      })
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }
  return (
    <button onClick={handleLogout} className="w-full">
      <DropdownMenuItem>
        <span>Sign out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </button>
  )
}
