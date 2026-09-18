import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Density, Theme } from '../types/system';

interface SystemContextValue {
  theme: Theme;
  density: Density;
  setTheme: (t: Theme) => void;
  setDensity: (d: Density) => void;
  toggleTheme: () => void;
}

const SystemContext = createContext<SystemContextValue | null>(null);

interface SystemProviderProps {
  theme: Theme;
  density: Density;
  children: React.ReactNode;
}

export function SystemProvider({ theme: initialTheme, density: initialDensity, children }: SystemProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [density, setDensity] = useState<Density>(initialDensity);

  useEffect(() => setTheme(initialTheme), [initialTheme]);
  useEffect(() => setDensity(initialDensity), [initialDensity]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-density', density);
  }, [theme, density]);

  const toggleTheme = useCallback(() => setTheme((t) => t === 'light' ? 'dark' : 'light'), []);

  const value = useMemo(
    () => ({ theme, density, setTheme, setDensity, toggleTheme }),
    [theme, density, toggleTheme]
  );

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}

export function useSystem(): SystemContextValue {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error('useSystem must be used inside SystemProvider');
  return ctx;
}