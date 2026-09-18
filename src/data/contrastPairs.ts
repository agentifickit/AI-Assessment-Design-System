import type { ContrastTarget } from '../utils/contrast';

export interface ContrastPair {
  id: string;
  label: string;
  /** CSS custom property for the foreground. */
  fg: string;
  /** CSS custom property for the background it is intended to sit on. */
  bg: string;
  target: ContrastTarget;
  /** Where this pair appears. Kept specific so a failure is actionable. */
  usage: string;
}

export interface ContrastGroup {
  id: string;
  label: string;
  note?: string;
  pairs: ContrastPair[];
}

export const contrastGroups: ContrastGroup[] = [
{
  id: 'action',
  label: 'Primary action',
  note:
  'The reason this group exists. Signal orange (#f6521f) carries only 3.4:1 against white, so the fix is the ink rather than the ramp: near-black on the same bright orange reaches 5.0:1. Interaction brightens the surface, so contrast rises as the button is engaged.',
  pairs: [
  {
    id: 'action-label',
    label: 'Action label on action surface',
    fg: '--action-primary-fg',
    bg: '--action-primary',
    target: 'text',
    usage: 'Button primary, SplitButton, PromptComposer send, Stepper active marker'
  },
  {
    id: 'action-hover',
    label: 'Action label on hover surface',
    fg: '--action-primary-fg',
    bg: '--action-primary-hover',
    target: 'text',
    usage: 'Primary button hover — brightens to orange-400'
  },
  {
    id: 'action-active',
    label: 'Action label on pressed surface',
    fg: '--action-primary-fg',
    bg: '--action-primary-active',
    target: 'text',
    usage: 'Primary button pressed — brightest step, paired with the 1px nudge'
  },
  {
    id: 'brand-nontext',
    label: 'Brand accent against canvas',
    fg: '--brand-accent',
    bg: '--canvas',
    target: 'non-text',
    usage: 'Focus ring, nav marker, live-session dot, selected border'
  },
  {
    id: 'brand-fg',
    label: 'Brand accent text',
    fg: '--brand-accent-fg',
    bg: '--surface',
    target: 'text',
    usage: 'Accent-coloured text and icons — orange-700, never orange-500'
  }]

},
{
  id: 'foreground',
  label: 'Foreground on surfaces',
  pairs: [
  { id: 'fg-primary', label: 'Primary text', fg: '--fg-primary', bg: '--surface', target: 'text', usage: 'Body and headings' },
  { id: 'fg-primary-canvas', label: 'Primary text on canvas', fg: '--fg-primary', bg: '--canvas', target: 'text', usage: 'Text outside a panel' },
  { id: 'fg-secondary', label: 'Secondary text', fg: '--fg-secondary', bg: '--surface', target: 'text', usage: 'Supporting prose, table cells' },
  { id: 'fg-muted', label: 'Muted text', fg: '--fg-muted', bg: '--surface', target: 'text', usage: 'Metadata, timestamps, hints' },
  { id: 'fg-muted-subtle', label: 'Muted text on subtle surface', fg: '--fg-muted', bg: '--surface-subtle', target: 'text', usage: 'Table headers, sunken records' },
  { id: 'fg-secondary-sunken', label: 'Secondary text on sunken surface', fg: '--fg-secondary', bg: '--surface-sunken', target: 'text', usage: 'Source event records' },
  { id: 'link', label: 'Link text', fg: '--link-fg', bg: '--surface', target: 'text', usage: 'Inline links in body copy' },
  { id: 'border-default', label: 'Default border against canvas', fg: '--border-default', bg: '--canvas', target: 'non-text', usage: 'Panel, card, and input boundaries' }]

},
{
  id: 'status',
  label: 'System status',
  note: 'Status colours describe the system, never a person. Each foreground is checked against its own tinted background.',
  pairs: [
  { id: 'info', label: 'Information', fg: '--info-fg', bg: '--info-bg', target: 'text', usage: 'Informational alerts and badges' },
  { id: 'success', label: 'Success', fg: '--success-fg', bg: '--success-bg', target: 'text', usage: 'Save confirmed, submission received' },
  { id: 'warning', label: 'Warning', fg: '--warning-fg', bg: '--warning-bg', target: 'text', usage: 'Unstable connection, queued changes' },
  { id: 'danger', label: 'Danger', fg: '--danger-fg', bg: '--danger-bg', target: 'text', usage: 'Failed action, destructive confirmation' },
  { id: 'neutral-status', label: 'Neutral status', fg: '--neutral-status-fg', bg: '--neutral-status-bg', target: 'text', usage: 'Draft, archived, scheduled' }]

},
{
  id: 'provenance',
  label: 'Provenance',
  pairs: [
  { id: 'ai', label: 'AI attribution', fg: '--ai-fg', bg: '--ai-bg', target: 'text', usage: 'AI-generated draft label' },
  { id: 'ai-rule', label: 'AI rule against surface', fg: '--ai-border', bg: '--surface', target: 'non-text', usage: 'The 2px left rule on AI blocks' },
  { id: 'human', label: 'Reviewer decision text', fg: '--human-fg', bg: '--human-bg', target: 'text', usage: 'Accountable conclusions' },
  { id: 'human-rule', label: 'Reviewer rule against surface', fg: '--human-border', bg: '--surface', target: 'non-text', usage: 'The 2px left rule on decisions' }]

},
{
  id: 'evidence',
  label: 'Evidence states',
  note:
  'Evidence badges render their label at 11px, which this system treats as normal text — so all ten states are held to 4.5:1, not 3:1.',
  pairs: [
  { id: 'ev-positive', label: 'Positive evidence', fg: '--ev-positive-fg', bg: '--ev-positive-bg', target: 'text', usage: 'Evidence badge and excerpt' },
  { id: 'ev-development', label: 'Development area', fg: '--ev-development-fg', bg: '--ev-development-bg', target: 'text', usage: 'Evidence badge and excerpt' },
  { id: 'ev-neutral', label: 'Neutral observation', fg: '--ev-neutral-fg', bg: '--ev-neutral-bg', target: 'text', usage: 'Evidence badge and excerpt' },
  { id: 'ev-incomplete', label: 'Incomplete evidence', fg: '--ev-incomplete-fg', bg: '--ev-incomplete-bg', target: 'text', usage: 'Evidence badge and limitation block' },
  { id: 'ev-invalid', label: 'Invalid opportunity', fg: '--ev-invalid-fg', bg: '--ev-invalid-bg', target: 'text', usage: 'Evidence badge and limitation block' },
  { id: 'ev-unmeasured', label: 'Unmeasured behaviour', fg: '--ev-unmeasured-fg', bg: '--surface', target: 'text', usage: 'Unfilled badge on a panel surface' },
  { id: 'ev-disagreement', label: 'Reviewer disagreement', fg: '--ev-disagreement-fg', bg: '--ev-disagreement-bg', target: 'text', usage: 'Evidence badge, reviewer queue flag' },
  { id: 'ev-overridden', label: 'Overridden interpretation', fg: '--ev-overridden-fg', bg: '--ev-overridden-bg', target: 'text', usage: 'Override disclosure' },
  { id: 'ev-approved', label: 'Approved conclusion', fg: '--ev-approved-fg', bg: '--ev-approved-bg', target: 'text', usage: 'Approved badge in report and queue' },
  { id: 'ev-escalation', label: 'Escalation required', fg: '--ev-escalation-fg', bg: '--ev-escalation-bg', target: 'text', usage: 'Escalation badge and reviewer footer' }]

},
{
  id: 'viz',
  label: 'Data visualisation',
  note: 'Series fills are non-text marks, checked against the surface they are drawn on.',
  pairs: [
  { id: 'viz-1', label: 'Series 1', fg: '--viz-1', bg: '--surface', target: 'non-text', usage: 'Dimension profile bars' },
  { id: 'viz-2', label: 'Series 2', fg: '--viz-2', bg: '--surface', target: 'non-text', usage: 'Dimension profile bars' },
  { id: 'viz-3', label: 'Series 3', fg: '--viz-3', bg: '--surface', target: 'non-text', usage: 'Dimension profile bars' },
  { id: 'viz-4', label: 'Series 4', fg: '--viz-4', bg: '--surface', target: 'non-text', usage: 'Dimension profile bars' },
  { id: 'viz-5', label: 'Series 5', fg: '--viz-5', bg: '--surface', target: 'non-text', usage: 'Dimension profile bars' }]

}];


export const allContrastPairs = contrastGroups.flatMap((g) => g.pairs);