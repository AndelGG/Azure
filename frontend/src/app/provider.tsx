'use client';

import { ThemeProvider } from './(contexts)';
import { QueryProvider } from './(contexts)/query';

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
}
