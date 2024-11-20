"use client"
import { ReactNode } from 'react';
import { AbilityContext } from './AbilityContext';
import { defineAbilityFor } from './ability';
import { useSession } from 'next-auth/react';

export function AbilityProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const ability = defineAbilityFor(
    session?.user?.roles || ['USER'], 
    session?.user?.id || ''
  );

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}