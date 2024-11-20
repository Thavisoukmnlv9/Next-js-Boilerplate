"use client"
import { ReactNode } from 'react';
import { AbilityContext } from './context';
import { useSession } from 'next-auth/react';
import { defineAbilityFor } from './builder';

export function AbilityProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const ability = defineAbilityFor(
    session?.user?.roles || ['ADMIN'], 
    session?.user?.id || ''
  );
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}