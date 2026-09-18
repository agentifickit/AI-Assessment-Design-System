import React from 'react';
import { cn } from '../../utils/cn';
import type { TokenRow } from '../../types/system';

export interface TokenTableProps {
  caption: string;
  rows: TokenRow[];
  /** Renders a colour chip from the light value. */
  swatch?: boolean;
  showDark?: boolean;
  className?: string;
}

export function TokenTable({ caption, rows, swatch, showDark = true, className }: TokenTableProps) {
  return (
    <div className={cn('scroll-panel overflow-x-auto rounded-md border border-line', className)}>
      <table className="w-full border-collapse text-13">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-surface-subtle">
            <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Token
            </th>
            <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Light
            </th>
            {showDark &&
            <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                Dark
              </th>
            }
            <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Usage
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) =>
          <tr key={r.name} className="border-b border-line-subtle last:border-b-0">
              <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-fg-primary">{r.name}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-fg-secondary">
                <span className="inline-flex items-center gap-2">
                  {swatch &&
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-line"
                  style={{ background: r.value }} />

                }
                  {r.value}
                </span>
              </td>
              {showDark &&
            <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-fg-secondary">
                  <span className="inline-flex items-center gap-2">
                    {swatch && r.dark &&
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-line"
                  style={{ background: r.dark }} />

                }
                    {r.dark ?? '—'}
                  </span>
                </td>
            }
              <td className="px-3 py-2 align-top text-13 text-fg-secondary">
                {r.usage}
                {r.note && <span className="mt-0.5 block text-2xs text-fg-muted">{r.note}</span>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}