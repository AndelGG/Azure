'use client';

import { ThemeProvider } from './(contexts)';

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
