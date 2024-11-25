"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { defineAbilityFor } from "./builder";
import { AbilityContext } from "./context";

export function AbilityProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const ability = defineAbilityFor(
    session?.user?.roles || ["admin"],
    session?.user?.id || "",
  );
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
