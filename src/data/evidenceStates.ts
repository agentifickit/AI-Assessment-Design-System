import type { EvidenceStateSpec } from '../types/system';

/** The locked triple — glyph, label, hue — for every evidence state in the system.
 *  Hue is categorical. It never implies better or worse. */
export const evidenceStates: EvidenceStateSpec[] = [
{
  id: 'positive',
  label: 'Positive evidence',
  meaning: 'The behaviour was observed and is supported by a specific moment in the session.',
  glyph: 'positive',
  fg: 'var(--ev-positive-fg)',
  bg: 'var(--ev-positive-bg)',
  border: 'var(--ev-positive-border)'
},
{
  id: 'development',
  label: 'Development area',
  meaning: 'The behaviour was observed but applied inconsistently or incompletely.',
  glyph: 'development',
  fg: 'var(--ev-development-fg)',
  bg: 'var(--ev-development-bg)',
  border: 'var(--ev-development-border)'
},
{
  id: 'neutral',
  label: 'Neutral observation',
  meaning: 'Something happened that is worth recording but carries no interpretation on its own.',
  glyph: 'neutral',
  fg: 'var(--ev-neutral-fg)',
  bg: 'var(--ev-neutral-bg)',
  border: 'var(--ev-neutral-border)'
},
{
  id: 'incomplete',
  label: 'Incomplete evidence',
  meaning: 'Part of the record exists, but not enough to support a conclusion.',
  glyph: 'incomplete',
  fg: 'var(--ev-incomplete-fg)',
  bg: 'var(--ev-incomplete-bg)',
  border: 'var(--ev-incomplete-border)'
},
{
  id: 'invalid',
  label: 'Invalid opportunity',
  meaning: 'The task did not create a fair chance to demonstrate this behaviour.',
  glyph: 'invalid',
  fg: 'var(--ev-invalid-fg)',
  bg: 'var(--ev-invalid-bg)',
  border: 'var(--ev-invalid-border)'
},
{
  id: 'unmeasured',
  label: 'Unmeasured behaviour',
  meaning: 'This assessment does not attempt to measure this behaviour.',
  glyph: 'unmeasured',
  fg: 'var(--ev-unmeasured-fg)',
  bg: 'var(--ev-unmeasured-bg)',
  border: 'var(--ev-unmeasured-border)'
},
{
  id: 'disagreement',
  label: 'Reviewer disagreement',
  meaning: 'Two reviewers reached different conclusions from the same evidence.',
  glyph: 'disagreement',
  fg: 'var(--ev-disagreement-fg)',
  bg: 'var(--ev-disagreement-bg)',
  border: 'var(--ev-disagreement-border)'
},
{
  id: 'overridden',
  label: 'Overridden interpretation',
  meaning: 'A reviewer replaced the AI-generated draft interpretation. The original is retained.',
  glyph: 'overridden',
  fg: 'var(--ev-overridden-fg)',
  bg: 'var(--ev-overridden-bg)',
  border: 'var(--ev-overridden-border)'
},
{
  id: 'approved',
  label: 'Approved conclusion',
  meaning: 'A named reviewer has accepted accountability for this conclusion.',
  glyph: 'approved',
  fg: 'var(--ev-approved-fg)',
  bg: 'var(--ev-approved-bg)',
  border: 'var(--ev-approved-border)'
},
{
  id: 'escalation',
  label: 'Escalation required',
  meaning: 'A second reviewer or a policy decision is needed before this can be released.',
  glyph: 'escalation',
  fg: 'var(--ev-escalation-fg)',
  bg: 'var(--ev-escalation-bg)',
  border: 'var(--ev-escalation-border)'
}];


export const evidenceStateMap = Object.fromEntries(
  evidenceStates.map((s) => [s.id, s])
) as Record<EvidenceStateSpec['id'], EvidenceStateSpec>;