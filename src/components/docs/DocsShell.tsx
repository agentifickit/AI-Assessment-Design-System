import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { navGroups } from '../../data/navigation';
import { useSystem } from '../../contexts/SystemContext';
import { ButtonGroup } from '../ui/ButtonGroup';
import { IconButton } from '../ui/IconButton';
import type { Density } from '../../types/system';

export function DocsShell({ children }: {children: React.ReactNode;}) {
  const { theme, toggleTheme, density, setDensity } = useSystem();
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isScreen = location.pathname.startsWith('/screens/');

  return (
    <div className="flex min-h-full w-full flex-col bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-sm focus:border focus:border-line focus:bg-surface focus:px-3 focus:py-1.5 focus:text-13">
        
        Skip to content
      </a>

      <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center justify-between gap-4 border-b border-line bg-surface px-3 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <IconButton
            label={navOpen ? 'Close navigation' : 'Open navigation'}
            icon={navOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            onClick={() => setNavOpen((o) => !o)}
            className="md:hidden" />
          
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-5 w-5 items-center justify-center rounded-xs bg-accent text-[10px] font-bold"
              style={{ color: 'var(--fg-on-accent)' }}>
              
              L
            </span>
            <span className="text-13 font-semibold text-fg-primary">Ledger</span>
            <span className="hidden text-2xs text-fg-muted sm:inline">
              AI-fluency assessment design system
            </span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonGroup
            label="Interface density"
            size="sm"
            className="hidden sm:inline-flex"
            value={density}
            onChange={(v) => setDensity(v as Density)}
            options={[
            { value: 'compact', label: 'Compact' },
            { value: 'default', label: 'Default' },
            { value: 'comfortable', label: 'Comfortable' }]
            } />
          
          <IconButton
            label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            variant="outline"
            icon={theme === 'light' ? <MoonIcon className="h-3.5 w-3.5" /> : <SunIcon className="h-3.5 w-3.5" />}
            onClick={toggleTheme} />
          
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav
          aria-label="Design system"
          className={cn(
            'scroll-panel w-60 shrink-0 overflow-y-auto border-r border-line bg-surface px-2 py-3',
            'md:sticky md:top-12 md:block md:h-[calc(100vh-3rem)]',
            navOpen ?
            'fixed inset-x-0 bottom-0 top-12 z-30 block w-full' :
            'hidden'
          )}>
          
          {navGroups.map((g) =>
          <div key={g.id} className="mb-4">
              <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                {g.label}
              </p>
              <ul className="flex flex-col gap-px">
                {g.items.map((i) =>
              <li key={i.to}>
                    <NavLink
                  to={i.to}
                  end={i.to === '/' || i.to === '/components'}
                  onClick={() => setNavOpen(false)}
                  className={({ isActive }) =>
                  cn(
                    'relative flex items-center rounded-sm px-2 py-1.5 text-13 transition-colors duration-100 ease-enter',
                    isActive ?
                    'bg-surface-active font-medium text-fg-primary' :
                    'text-fg-secondary hover:bg-surface-hover hover:text-fg-primary'
                  )
                  }>
                  
                      {({ isActive }) =>
                  <>
                          {isActive &&
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full"
                      style={{ background: 'var(--rail-active-marker)' }} />

                    }
                          {i.label}
                        </>
                  }
                    </NavLink>
                  </li>
              )}
              </ul>
            </div>
          )}
        </nav>

        <main id="main" className={cn('min-w-0 flex-1', isScreen ? 'p-0' : 'px-4 py-6 md:px-8 md:py-8')}>
          {children}
        </main>
      </div>
    </div>);

}