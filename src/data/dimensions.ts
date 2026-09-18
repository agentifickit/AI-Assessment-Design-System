import type { DimensionSpec, DimensionId } from '../types/framework';

/** Fixed order, everywhere. A reader learns the sequence once and can then
 *  scan any surface — timeline, reviewer workspace, report, comparison —
 *  without re-reading the labels. */
export const dimensions: DimensionSpec[] = [
{
  id: 'delegation',
  code: 'DL',
  label: 'Delegation',
  description: 'Whether the person gave the assistant work worth doing, and scoped it.',
  observables: [
  'Framed a task rather than asking an open question',
  'Broke a large request into workable parts',
  'Chose to do something themselves instead of delegating it',
  'Re-scoped after a weak or off-target result'],

  unmeasuredCopy: 'Delegation was not measured in this assessment.'
},
{
  id: 'description',
  code: 'DS',
  label: 'Description',
  description: 'Whether they supplied the context the work actually required.',
  observables: [
  'Attached or quoted the brief and reference material',
  'Named the audience, format, and constraints',
  'Corrected the assistant after a misread',
  'Supplied an example of the output they wanted'],

  unmeasuredCopy: 'Description was not measured in this assessment.'
},
{
  id: 'discernment',
  code: 'DC',
  label: 'Discernment',
  description: 'Whether they judged what came back and improved on it.',
  observables: [
  'Rejected or reworked output rather than accepting it',
  'Asked the assistant to justify a claim',
  'Edited the draft instead of pasting it through',
  'Noticed an unsupported or implausible statement'],

  unmeasuredCopy: 'Discernment was not measured in this assessment.'
},
{
  id: 'diligence',
  code: 'DG',
  label: 'Diligence',
  description: 'Whether they verified what mattered and kept ownership of the result.',
  observables: [
  'Checked a figure or quote against the source material',
  'Cited where a claim came from',
  'Declined to use something they could not verify',
  'Made a final editorial pass over the deliverable'],

  unmeasuredCopy: 'Diligence was not measured in this assessment.'
}];


export const dimensionMap = Object.fromEntries(dimensions.map((d) => [d.id, d])) as Record<
  DimensionId,
  DimensionSpec>;


export const dimensionOrder: DimensionId[] = dimensions.map((d) => d.id);