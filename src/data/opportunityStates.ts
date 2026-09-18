import type { OpportunityStateSpec, OpportunityStateId } from '../types/framework';

/** Six states describing whether the assessment ever got a fair chance to
 *  observe a behaviour. Conflating these with performance is what turns a
 *  system failure into an apparent weakness — so they are a separate
 *  vocabulary with their own glyphs and their own copy. */
export const opportunityStates: OpportunityStateSpec[] = [
{
  id: 'presented',
  label: 'Opportunity presented',
  meaning: 'The task created a genuine chance to show this behaviour. A statement about the task, not the person.',
  supportsFinding: false,
  isAbsence: false,
  fg: 'var(--ev-neutral-fg)',
  bg: 'var(--ev-neutral-bg)',
  border: 'var(--ev-neutral-border)'
},
{
  id: 'observed',
  label: 'Behaviour observed',
  meaning: 'The chance existed and the person acted on it. The only state that can support a finding.',
  supportsFinding: true,
  isAbsence: false,
  fg: 'var(--ev-positive-fg)',
  bg: 'var(--ev-positive-bg)',
  border: 'var(--ev-positive-border)'
},
{
  id: 'not-observed',
  label: 'Behaviour not observed',
  meaning: 'The chance existed and was not taken. Reported as an absence with the opportunity linked — never as a low rating.',
  supportsFinding: false,
  isAbsence: true,
  fg: 'var(--ev-development-fg)',
  bg: 'var(--ev-development-bg)',
  border: 'var(--ev-development-border)'
},
{
  id: 'invalid',
  label: 'Invalid opportunity',
  meaning: 'The task did not create a fair chance. Excluded from findings and reported as a limitation of the assessment.',
  supportsFinding: false,
  isAbsence: true,
  fg: 'var(--ev-invalid-fg)',
  bg: 'var(--ev-invalid-bg)',
  border: 'var(--ev-invalid-border)'
},
{
  id: 'capture-failed',
  label: 'Evidence capture failed',
  meaning: 'A fault on our side prevented capture. This does not indicate how the person performed.',
  supportsFinding: false,
  isAbsence: true,
  fg: 'var(--ev-incomplete-fg)',
  bg: 'var(--ev-incomplete-bg)',
  border: 'var(--ev-incomplete-border)'
},
{
  id: 'not-assessed',
  label: 'Not assessed',
  meaning: 'Out of scope for this assessment by design. Shown so scope is never mistaken for a gap.',
  supportsFinding: false,
  isAbsence: false,
  fg: 'var(--ev-unmeasured-fg)',
  bg: 'var(--ev-unmeasured-bg)',
  border: 'var(--ev-unmeasured-border)'
}];


export const opportunityStateMap = Object.fromEntries(
  opportunityStates.map((s) => [s.id, s])
) as Record<OpportunityStateId, OpportunityStateSpec>;

/** The states that must never appear inside a rating control. */
export const nonRatableOpportunityStates: OpportunityStateId[] = opportunityStates.
filter((s) => !s.supportsFinding && s.id !== 'presented').
map((s) => s.id);