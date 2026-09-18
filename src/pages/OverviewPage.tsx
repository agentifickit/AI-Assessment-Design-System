import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { DocSection } from '../components/docs/DocSection';
import { principles } from '../data/principles';
import { EvidenceStateBadge } from '../components/evidence/EvidenceStateBadge';
import { evidenceStates } from '../data/evidenceStates';

const foundationLinks = [
{ label: 'Token architecture', to: '/foundations/tokens' },
{ label: 'Colour', to: '/foundations/color' },
{ label: 'Typography', to: '/foundations/typography' },
{ label: 'Spacing & density', to: '/foundations/spacing' },
{ label: 'Border', to: '/foundations/border' },
{ label: 'Elevation', to: '/foundations/elevation' },
{ label: 'Radius', to: '/foundations/radius' },
{ label: 'Layout', to: '/foundations/layout' },
{ label: 'Motion', to: '/foundations/motion' }];


const screenLinks = [
{ label: 'Candidate assessment workspace', to: '/screens/workspace' },
{ label: 'Reviewer evidence workspace', to: '/screens/reviewer' },
{ label: 'Candidate evidence report', to: '/screens/report' },
{ label: 'Candidate comparison', to: '/screens/comparison' },
{ label: 'Assessment administration', to: '/screens/admin' }];


export function OverviewPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Ledger design system"
        title="A system for evidence, not scores"
        intro="Ledger is the design system for an AI-fluency skills assessment product. It exists to make one thing structurally impossible: presenting a machine's reading of a person as if it were a finished judgement. Everything below — tokens, components, patterns — is downstream of that." />
      

      <DocSection
        title="What this system is for"
        description="The product observes how someone delegates to AI, gives context, challenges output, verifies detail, and keeps ownership of the result. It produces evidence for a human decision. Four audiences share one visual language.">
        
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
          {
            role: 'Candidate',
            need: 'A focused workspace, honest time and save states, and confidence that a technical failure will not quietly become poor performance.',
            density: 'Comfortable density'
          },
          {
            role: 'Reviewer',
            need: 'Long sessions made scannable: an evidence timeline, transcript inspection, AI drafts they can override, and an accountable approval step.',
            density: 'Compact density'
          },
          {
            role: 'Hiring manager',
            need: 'Findings linked to moments, stated limitations, follow-up questions to ask — and no recommendation about whether to hire.',
            density: 'Default density'
          },
          {
            role: 'Administrator',
            need: 'Configuration, invitations, completion tracking, permissions, audit history, and retention controls.',
            density: 'Default density'
          }].
          map((a) =>
          <div key={a.role} className="flex flex-col rounded-md border border-line bg-surface p-3">
              <p className="text-13 font-semibold text-fg-primary">{a.role}</p>
              <p className="mt-1.5 flex-1 text-13 leading-6 text-fg-secondary">{a.need}</p>
              <p className="mt-3 text-2xs text-fg-muted">{a.density}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Six principles"
        description={
        <>
            Each one exists because it changes what gets built.{' '}
            <Link to="/principles" className="text-link underline underline-offset-2 hover:text-link-hover">
              Read the full rationale
            </Link>
            .
          </>
        }>
        
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) =>
          <li key={p.number} className="flex flex-col rounded-md border border-line bg-surface p-3">
              <span className="font-mono text-2xs text-fg-muted tnum">{p.number}</span>
              <h3 className="mt-1 text-13 font-semibold text-fg-primary">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-13 leading-6 text-fg-secondary">{p.body}</p>
            </li>
          )}
        </ol>
      </DocSection>

      <DocSection
        title="The evidence vocabulary"
        description="Ten states, each with a locked glyph, written label, and categorical hue. The glyph and the label carry the meaning; the hue only helps you find it again. Nothing here is a rank.">
        
        <div className="flex flex-wrap gap-2 rounded-md border border-line bg-surface p-4">
          {evidenceStates.map((s) =>
          <EvidenceStateBadge key={s.id} state={s.id} />
          )}
        </div>
      </DocSection>

      <DocSection
        title="Foundations"
        description="The token layer everything else is built from. Each page states the decision, the values, and the accessibility target — not a menu of options.">
        
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {foundationLinks.map((s) =>
          <li key={s.to}>
              <Link
              to={s.to}
              className="flex items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 py-2.5 text-13 text-fg-primary transition-colors duration-100 ease-enter hover:bg-surface-hover">
              
                {s.label}
                <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </DocSection>

      <DocSection
        title="Example screens"
        description="Every screen is composed from the documented components — not mocked separately. They are the proof that the foundations hold under real content, and where the system was corrected when they did not.">
        
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {screenLinks.map((s) =>
          <li key={s.to}>
              <Link
              to={s.to}
              className="flex items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 py-2.5 text-13 text-fg-primary transition-colors duration-100 ease-enter hover:bg-surface-hover">
              
                {s.label}
                <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </DocSection>
    </div>);

}