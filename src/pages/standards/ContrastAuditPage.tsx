import React, { useEffect, useMemo, useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Alert } from '../../components/ui/Alert';
import { cn } from '../../utils/cn';
import { contrastGroups } from '../../data/contrastPairs';
import { contrastRatio, formatRatio, passes, resolveToken, targetRatio } from '../../utils/contrast';
import { useSystem } from '../../contexts/SystemContext';

interface Measured {
  id: string;
  ratio: number | null;
  ok: boolean;
  fgValue: string;
  bgValue: string;
}

/** Resolves every documented pair against the live document, so the figures
 *  shown here are what the browser is actually painting — not a table someone
 *  updated by hand and then forgot. */
export function ContrastAuditPage() {
  const { theme } = useSystem();
  const [measured, setMeasured] = useState<Record<string, Measured>>({});

  useEffect(() => {
    // Deferred a frame so the theme attribute has been applied before reading.
    const raf = requestAnimationFrame(() => {
      const next: Record<string, Measured> = {};
      for (const group of contrastGroups) {
        for (const pair of group.pairs) {
          const fgValue = resolveToken(pair.fg);
          const bgValue = resolveToken(pair.bg);
          const ratio = contrastRatio(fgValue, bgValue);
          next[pair.id] = { id: pair.id, ratio, ok: passes(ratio, pair.target), fgValue, bgValue };
        }
      }
      setMeasured(next);
    });
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  const all = useMemo(() => Object.values(measured), [measured]);
  const failing = all.filter((m) => !m.ok && m.ratio !== null);
  const unresolved = all.filter((m) => m.ratio === null);

  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="Contrast audit"
        intro="Every documented foreground and background pair, resolved from the live theme and measured against its WCAG 2.2 target. Switch the theme in the header and the figures re-measure — a regression becomes visible rather than theoretical."
        aside={
        <div className="rounded-md border border-line bg-surface px-3 py-2 text-right">
            <p className="text-2xs uppercase tracking-wide text-fg-muted">Current theme</p>
            <p className="mt-0.5 text-13 font-semibold text-fg-primary">{theme === 'dark' ? 'Dark' : 'Light'}</p>
            <p className="mt-1 text-2xs text-fg-muted tnum">
              {all.length - failing.length - unresolved.length} of {all.length} passing
            </p>
          </div>
        } />
      

      {failing.length === 0 ?
      <Alert
        className="mb-8"
        tone="success"
        title={`All ${all.length} documented pairs pass in ${theme} theme`}
        children="Normal text is held to 4.5:1, large text and non-text UI to 3:1. In this system 11px badge text counts as normal text, so all ten evidence states are held to 4.5:1." /> :


      <Alert
        className="mb-8"
        tone="danger"
        title={`${failing.length} pair${failing.length === 1 ? '' : 's'} below target in ${theme} theme`}
        children="Fix these at the token level rather than by exception in a component. A pair that fails here fails everywhere the token is used." />

      }

      <DocSection
        title="The accent split"
        description="The reason this page exists. Signal orange is the brand, but at 3.4:1 on white it can only carry non-text roles. Primary actions sit on a deeper token so their labels clear 4.5:1.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">Brand accent · non-text</p>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="h-9 w-9 shrink-0 rounded-sm" style={{ background: 'var(--brand-accent)' }} aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-mono text-2xs text-fg-secondary">--brand-accent</p>
                <p className="mt-0.5 text-13 leading-6 text-fg-secondary">
                  Focus rings, the active nav marker, selected borders, the live-session dot, chart accents.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">Primary action · carries text</p>
            <div className="mt-2.5 flex items-center gap-3">
              <span
                className="inline-flex h-9 shrink-0 items-center rounded-sm px-3 text-13 font-medium"
                style={{ background: 'var(--action-primary)', color: 'var(--action-primary-fg)' }}>
                
                Submit
              </span>
              <div className="min-w-0">
                <p className="font-mono text-2xs text-fg-secondary">--action-primary</p>
                <p className="mt-0.5 text-13 leading-6 text-fg-secondary">
                  The only accent-family surface permitted to hold a label.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {contrastGroups.map((group) =>
      <DocSection key={group.id} title={group.label} description={group.note}>
          <div className="overflow-x-auto rounded-md border border-line bg-surface">
            <table className="w-full min-w-[48rem] border-collapse text-13">
              <caption className="sr-only">{group.label} contrast measurements</caption>
              <thead>
                <tr className="border-b border-line bg-surface-subtle">
                  {['Pair', 'Foreground', 'Background', 'Target', 'Measured', 'Result'].map((h) =>
                <th
                  key={h}
                  scope="col"
                  className={cn(
                    'px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted',
                    h === 'Measured' || h === 'Target' || h === 'Result' ? 'text-right' : 'text-left'
                  )}>
                  
                      {h}
                    </th>
                )}
                </tr>
              </thead>
              <tbody>
                {group.pairs.map((pair) => {
                const m = measured[pair.id];
                return (
                  <tr key={pair.id} className="border-b border-line-subtle last:border-b-0 align-top">
                      <th scope="row" className="px-3 py-2.5 text-left">
                        <span className="block text-13 font-medium text-fg-primary">{pair.label}</span>
                        <span className="mt-0.5 block text-2xs leading-5 text-fg-muted">{pair.usage}</span>
                      </th>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-xs border border-line"
                          style={{ background: `var(${pair.fg})` }} />
                        
                          <span className="font-mono text-2xs text-fg-secondary">{pair.fg}</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-xs border border-line"
                          style={{ background: `var(${pair.bg})` }} />
                        
                          <span className="font-mono text-2xs text-fg-secondary">{pair.bg}</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="text-2xs text-fg-muted tnum">{targetRatio[pair.target]}:1</span>
                        <span className="mt-0.5 block text-[10px] text-fg-muted">{pair.target}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-2xs text-fg-primary tnum">
                        {formatRatio(m?.ratio ?? null)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        {m?.ratio == null ?
                      <span className="text-2xs text-fg-muted">not resolved</span> :

                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-xs border px-1.5 py-0.5 text-2xs font-medium',
                          m.ok ?
                          'border-success-border bg-success-bg text-success-fg' :
                          'border-danger-border bg-danger-bg text-danger-fg'
                        )}>
                        
                            {m.ok ?
                        <CheckIcon className="h-3 w-3" aria-hidden="true" /> :

                        <XIcon className="h-3 w-3" aria-hidden="true" />
                        }
                            {m.ok ? 'Pass' : 'Fail'}
                          </span>
                      }
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
        </DocSection>
      )}
    </>);

}