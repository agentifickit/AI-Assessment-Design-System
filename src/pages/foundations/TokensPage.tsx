import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { TokenTable } from '../../components/docs/TokenTable';
import { DoDont } from '../../components/docs/DoDont';
import { componentTokens } from '../../data/tokens';

const tiers = [
{
  n: '1',
  t: 'Primitive',
  d: 'Raw values with no meaning attached. Named for what they are, never for where they are used.',
  ex: ['--neutral-900', '--orange-500', '--space-12', '--duration-3']
},
{
  n: '2',
  t: 'Semantic',
  d: 'Roles in the interface. This is the only tier remapped between light and dark, and the only tier most work touches.',
  ex: ['--fg-primary', '--accent-solid', '--surface-raised', '--ev-positive-fg']
},
{
  n: '3',
  t: 'Component',
  d: 'Theme-agnostic aliases owned by a single component. They exist so a component can be retargeted without touching the semantic layer.',
  ex: ['--btn-primary-bg', '--msg-user-border', '--table-row-hover', '--timer-fg-final']
}];


export function TokensPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Token architecture"
        intro="Three tiers, strictly one-directional. Components read semantic tokens. Semantic tokens read primitives. Primitives read nothing. A component that reaches past its tier is a bug, because it silently opts out of theming." />
      

      <DocSection title="The three tiers">
        <div className="grid gap-3 md:grid-cols-3">
          {tiers.map((t) =>
          <div key={t.n} className="flex flex-col rounded-md border border-line bg-surface p-4">
              <span className="font-mono text-2xs text-fg-muted">Tier {t.n}</span>
              <h3 className="mt-1 text-13 font-semibold text-fg-primary">{t.t}</h3>
              <p className="mt-1.5 flex-1 text-13 leading-6 text-fg-secondary">{t.d}</p>
              <ul className="mt-3 flex flex-col gap-1 border-t border-line-subtle pt-3 font-mono text-xs text-fg-muted">
                {t.ex.map((e) =>
              <li key={e}>{e}</li>
              )}
              </ul>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Why the middle tier carries the theme"
        description="Dark mode is a single block of semantic overrides. Component tokens never appear in it, so adding a component never means adding theme work — and a theme can never drift from the components that use it.">
        
        <pre className="scroll-panel overflow-x-auto rounded-md border border-line bg-surface-sunken p-4 font-mono text-xs leading-6 text-fg-secondary">
{`:root {                        /* tier 1 + tier 2 light */
  --orange-500: #f6521f;
  --accent-solid: var(--orange-500);
  --btn-primary-bg: var(--accent-solid);   /* tier 3 */
}

[data-theme='dark'] {          /* tier 2 only */
  --accent-solid: var(--orange-400);
}`}
        </pre>
      </DocSection>

      <DocSection title="Component tokens in this system">
        <TokenTable caption="Component token aliases" rows={componentTokens} showDark={false} />
      </DocSection>

      <DocSection title="Naming rules">
        <DoDont
          doText={
          <ul className="list-disc pl-4">
              <li>
                <code className="font-mono text-xs">--fg-muted</code> — role, then modifier
              </li>
              <li>
                <code className="font-mono text-xs">--ev-incomplete-border</code> — domain, state, property
              </li>
              <li>Identical names in CSS, Tailwind config, the JSON export, and Figma variables</li>
            </ul>
          }
          dontText={
          <ul className="list-disc pl-4">
              <li>
                <code className="font-mono text-xs">--grey-light-2</code> — a value pretending to be a role
              </li>
              <li>
                <code className="font-mono text-xs">--sidebar-text</code> at the semantic tier — a component name in
                shared space
              </li>
              <li>Different names per platform, which guarantees drift within a release</li>
            </ul>
          } />
        
      </DocSection>
    </div>);

}