/** Content for the candidate assessment workspace composition.
 *  A plausible mid-market SaaS marketing task — specific enough that the
 *  layout is under real pressure, not lorem placeholder. */

export interface ReferenceDoc {
  id: string;
  name: string;
  meta: string;
  summary: string;
}

export const taskBrief = {
  assessment: 'Marketing · Campaign positioning',
  taskName: 'Reposition the Q3 renewal campaign',
  totalMinutes: 75,
  scenario:
  'You have joined Northwind Analytics as a marketing manager. Mid-market renewals have slipped for two quarters running. The team has drafted a renewal campaign that leans on new feature announcements, and the VP of Marketing is not convinced it addresses why customers are leaving.',
  deliverable:
  'Write a one-page repositioning note for the VP: the case for a change of angle, the angle you recommend, and the two strongest supporting points from the material provided.',
  expectations: [
  'Use the assistant however you find useful. There is no required number of messages.',
  'The reference material contains the only account data available to you.',
  'Anything you state as fact should be traceable to that material.',
  'You can revise your draft until you submit.'],

  constraints: [
  { label: 'Audience', value: 'VP of Marketing' },
  { label: 'Length', value: 'One page, roughly 300 words' },
  { label: 'Tone', value: 'Direct, internal, no marketing language' }]

};

export const referenceDocs: ReferenceDoc[] = [
{
  id: 'churn',
  name: 'Mid-market churn review.pdf',
  meta: 'PDF · 6 pages',
  summary:
  'Exit interviews from 24 mid-market accounts lost in H1. Cites onboarding time and unclear ownership of reporting, not missing features.'
},
{
  id: 'campaign',
  name: 'Q3 renewal campaign draft.docx',
  meta: 'DOCX · 3 pages',
  summary: 'The existing campaign. Three of four sections lead on newly shipped features.'
},
{
  id: 'brand',
  name: 'Brand guidelines.pdf',
  meta: 'PDF · 18 pages',
  summary: 'Voice, claim substantiation rules, and the approved list of comparative statements.'
},
{
  id: 'accounts',
  name: 'Renewal pipeline Q3.csv',
  meta: 'CSV · 142 rows',
  summary: 'Accounts up for renewal this quarter with segment, ARR band, and last touchpoint.'
}];


export interface TranscriptTurn {
  id: string;
  author: 'user' | 'assistant' | 'system';
  authorLabel: string;
  timestamp: string;
  body: string[];
  tool?: {action: string;status: 'completed' | 'running' | 'failed';duration?: string;detail?: string;};
  sources?: {index: number;title: string;locator: string;}[];
  branch?: {index: number;total: number;};
}

export const transcript: TranscriptTurn[] = [
{
  id: 't0',
  author: 'system',
  authorLabel: 'Task instruction',
  timestamp: '13:02',
  body: [
  'You have 75 minutes. Reference material is in the left panel. Your draft in the right panel saves automatically and you can review everything before submitting.']

},
{
  id: 't1',
  author: 'user',
  authorLabel: 'You',
  timestamp: '13:06',
  body: [
  'I have a churn review and a draft campaign. Before you write anything: read the churn review and tell me the three most common reasons mid-market accounts gave for leaving. Quote them.']

},
{
  id: 't2',
  author: 'assistant',
  authorLabel: 'Assistant',
  timestamp: '13:06',
  tool: {
    action: 'Retrieving from Mid-market churn review.pdf',
    status: 'completed',
    duration: '1.2s',
    detail: 'Matched 3 sections across pages 2–4.'
  },
  body: [
  'Three reasons appear most often across the 24 exit interviews:',
  '1. Time to first useful report — 14 of 24 accounts. "It took us eleven weeks to get a dashboard our regional managers would actually open." (p.2)',
  '2. Unclear internal ownership — 9 of 24. "Nobody on our side owned it after the champion left." (p.3)',
  '3. Cost of maintaining the integration — 6 of 24. (p.4)',
  'Feature gaps are mentioned by 3 of 24 accounts, and in two of those the named feature had shipped before renewal.'],

  sources: [
  { index: 1, title: 'Mid-market churn review.pdf', locator: 'p.2 · Exit interview summary' },
  { index: 2, title: 'Mid-market churn review.pdf', locator: 'p.3 · Ownership' }]

},
{
  id: 't3',
  author: 'user',
  authorLabel: 'You',
  timestamp: '13:11',
  body: [
  'That is the opposite of what the campaign leads on. Draft the opening two paragraphs of a note to the VP arguing for a change of angle. Do not claim anything the churn review does not support, and mark anything you are inferring.'],

  branch: { index: 2, total: 2 }
},
{
  id: 't4',
  author: 'assistant',
  authorLabel: 'Assistant',
  timestamp: '13:11',
  body: [
  'The Q3 renewal campaign leads on features in three of its four sections. The churn review does not support that emphasis: of 24 mid-market accounts lost in H1, 3 cited a feature gap, and two of those gaps had already shipped. The reasons that dominate are operational — eleven weeks to a report a regional manager would open, and no internal owner once the original champion left.',
  'Inference, not established by the material: that the same pattern holds for the 142 accounts in the Q3 pipeline. The churn review covers lost accounts only, so it cannot tell us what current renewals are weighing.']

}];


export const draftContent = `Repositioning note — Q3 renewal campaign

Recommendation
Lead the Q3 renewal campaign on time-to-value and internal ownership, not on newly shipped features.

Why the current angle is wrong
Three of the campaign's four sections lead on features. Of the 24 mid-market accounts we lost in H1, three cited a feature gap — and two of those features had shipped before the renewal date. The reasons that actually dominate are operational.

Supporting point 1 — time to first useful report
Fourteen of 24 lost accounts named this. One put it at eleven weeks before a regional manager would open a dashboard.

Supporting point 2 — ownership after champion turnover
Nine of 24 said no one on their side owned the account once the original champion left.

What this note does not establish
The churn review covers lost accounts only. I have not verified that the same pattern holds for the 142 accounts in the Q3 pipeline, and the note should not be read as saying it does.`;

export const submissionChecklist = [
{
  id: 'deliverable',
  label: 'Your draft is in the submission',
  detail: 'One page, 312 words. Last edited 13:47.',
  done: true
},
{
  id: 'claims',
  label: 'Claims you marked as inference are still marked',
  detail: 'One inference marked in the final paragraph.',
  done: true
},
{
  id: 'review',
  label: 'You have read your draft since your last edit',
  detail: 'Open the draft panel to review it before submitting.',
  done: false
}];


export const sharedOnSubmit = [
'Your draft, as it stands when you submit',
'Your full conversation with the assistant, including messages you edited',
'Which reference documents you opened and when',
'Time spent in the task and any interruptions we recorded'];


export const notSharedOnSubmit = [
'Anything you typed and deleted without sending',
'Your screen, camera, microphone, or keystrokes',
'Activity in any other application or browser tab'];