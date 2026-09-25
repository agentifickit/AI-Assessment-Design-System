import type { DimensionId, DimensionResult, OpportunityStateId } from '../types/framework';
import type { EvidenceStateId } from '../types/system';

export interface TimelineMoment {
  id: string;
  timestamp: string;
  dimension: DimensionId;
  eventType: string;
  /** Short label for the rail. */
  summary: string;
  evidenceState: EvidenceStateId;
  opportunity: OpportunityStateId;
  /** Layer 1 — verbatim record. */
  source: {detail: string;eventId: string;};
  /** Layer 2 — the observed behaviour, quoted. */
  evidence?: {before?: string;quote: string;after?: string;speaker: string;sourceLabel: string;};
  /** Layer 3 — AI draft. */
  interpretation?: {text: string;confidence: 'high' | 'moderate' | 'low';evidenceCount: number;};
  /** Layer 4 — the accountable human. */
  decision?: {reviewer: string;role: string;timestamp: string;text: string;overrode?: string;approved?: boolean;};
  /** Layer 5 — what cannot be concluded. */
  limitation?: {state: 'incomplete' | 'invalid' | 'unmeasured';title: string;reason: string;doesNotImply: string;};
  annotation?: {author: string;timestamp: string;text: string;anchor: string;};
}

export const candidate = {
  name: 'R. Adeyemi',
  reference: 'NW-2291',
  assessment: 'Marketing, Campaign positioning',
  completedAt: '14 Aug, 13:54',
  duration: '52 min of 75',
  reviewer: 'J. Okonkwo',
  reviewerRole: 'Assessment reviewer'
};

export const moments: TimelineMoment[] = [
{
  id: 'm1',
  timestamp: '13:06',
  dimension: 'delegation',
  eventType: 'Prompt sent',
  summary: 'Scoped a read-before-write instruction',
  evidenceState: 'positive',
  opportunity: 'observed',
  source: {
    detail: 'Message 1 of 9. 218 characters. One attachment: Mid-market churn review.pdf.',
    eventId: 'evt_01H9K2M'
  },
  evidence: {
    before: 'I have a churn review and a draft campaign.',
    quote: 'Before you write anything: read the churn review and tell me the three most common reasons mid-market accounts gave for leaving. Quote them.',
    speaker: 'Candidate',
    sourceLabel: 'Conversation, 13:06'
  },
  interpretation: {
    text: 'The candidate withheld the writing task until they had established what the source material said, and asked for quotations rather than a summary. This is consistent with scoping work before delegating it.',
    confidence: 'high',
    evidenceCount: 3
  },
  decision: {
    reviewer: 'J. Okonkwo',
    role: 'Assessment reviewer',
    timestamp: '15 Aug, 09:12',
    text: 'Agreed. The instruction sequences the work and constrains the output format. Counting toward Delegation.',
    approved: true
  }
},
{
  id: 'm2',
  timestamp: '13:11',
  dimension: 'discernment',
  eventType: 'Prompt sent',
  summary: 'Challenged the campaign against the data',
  evidenceState: 'positive',
  opportunity: 'observed',
  source: { detail: 'Message 3 of 9. 241 characters. Sent 4m 40s after the previous response.', eventId: 'evt_01H9K7Q' },
  evidence: {
    quote: 'That is the opposite of what the campaign leads on. Draft the opening two paragraphs of a note to the VP arguing for a change of angle. Do not claim anything the churn review does not support, and mark anything you are inferring.',
    after: 'The assistant produced two paragraphs with one inference marked.',
    speaker: 'Candidate',
    sourceLabel: 'Conversation, 13:11'
  },
  interpretation: {
    text: 'The candidate identified a contradiction between the campaign draft and the churn data, then constrained the assistant against unsupported claims. This may indicate they treat model output as needing substantiation.',
    confidence: 'moderate',
    evidenceCount: 2
  },
  decision: {
    reviewer: 'J. Okonkwo',
    role: 'Assessment reviewer',
    timestamp: '15 Aug, 09:19',
    text: 'The contradiction-spotting is clear evidence. I have narrowed the claim: the instruction to mark inferences is Diligence, not Discernment, and I have logged it under that dimension instead.',
    overrode:
    'The candidate identified a contradiction and constrained the assistant against unsupported claims, indicating strong discernment and verification behaviour in a single action.',
    approved: true
  },
  annotation: {
    author: 'J. Okonkwo',
    timestamp: '15 Aug, 09:21',
    text: 'Worth raising at interview: ask what they would have done if the churn review had been silent on the point.',
    anchor: 'Conversation, 13:11'
  }
},
{
  id: 'm3',
  timestamp: '13:24',
  dimension: 'diligence',
  eventType: 'Reference document opened',
  summary: 'Checked a quoted figure against the source',
  evidenceState: 'positive',
  opportunity: 'observed',
  source: {
    detail: 'Opened Mid-market churn review.pdf, page 2, for 71 seconds. Returned to the draft immediately after.',
    eventId: 'evt_01H9KC4'
  },
  evidence: {
    quote: 'Fourteen of 24 lost accounts named this.',
    after: 'Matches page 2 of the churn review, which records 14 of 24.',
    speaker: 'Candidate draft',
    sourceLabel: 'Draft, revision 4'
  },
  interpretation: {
    text: 'The figure in the draft matches the source document, and the document was opened before the figure was written. This is consistent with verification rather than reproduction.',
    confidence: 'moderate',
    evidenceCount: 2
  }
},
{
  id: 'm4',
  timestamp: '13:38',
  dimension: 'description',
  eventType: 'Evidence capture interrupted',
  summary: 'Capture failed during a connection drop',
  evidenceState: 'incomplete',
  opportunity: 'capture-failed',
  source: {
    detail: 'Connection lost at 13:38:12, restored at 13:40:04. Draft autosave queued locally and reconciled on reconnect.',
    eventId: 'evt_01H9KJ1'
  },
  limitation: {
    state: 'incomplete',
    title: 'Evidence not captured for this period',
    reason:
    'A connection interruption between 13:38 and 13:40 prevented capture of conversation activity. The candidate’s draft was preserved; their messages during this window were not recorded.',
    doesNotImply:
    'This does not indicate how the candidate performed during this period, and must not be read as an absence of behaviour.'
  }
},
{
  id: 'm5',
  timestamp: '13:47',
  dimension: 'diligence',
  eventType: 'Draft revision',
  summary: 'Stated the limits of their own conclusion',
  evidenceState: 'positive',
  opportunity: 'observed',
  source: { detail: 'Draft revision 7. Added a closing section of 41 words. No assistant message preceded it.', eventId: 'evt_01H9KP8' },
  evidence: {
    quote: 'The churn review covers lost accounts only. I have not verified that the same pattern holds for the 142 accounts in the Q3 pipeline, and the note should not be read as saying it does.',
    speaker: 'Candidate draft',
    sourceLabel: 'Draft, revision 7'
  },
  interpretation: {
    text: 'The candidate added an unprompted statement of what their own recommendation does not establish. No assistant message suggested it.',
    confidence: 'high',
    evidenceCount: 1
  }
},
{
  id: 'm6',
  timestamp: '13:52',
  dimension: 'delegation',
  eventType: 'Task opportunity',
  summary: 'Re-scoping opportunity not taken',
  evidenceState: 'neutral',
  opportunity: 'not-observed',
  source: {
    detail: 'The assistant returned a section that repeated an earlier paragraph. The candidate edited it manually rather than re-prompting.',
    eventId: 'evt_01H9KT2'
  },
  interpretation: {
    text: 'The candidate corrected the repetition by hand instead of re-scoping the request. This is a valid choice and is recorded as an observation, not a shortfall.',
    confidence: 'low',
    evidenceCount: 1
  },
  limitation: {
    state: 'unmeasured',
    title: 'Cannot distinguish between two explanations',
    reason:
    'The session does not show whether the candidate judged manual editing to be faster, or did not consider re-prompting.',
    doesNotImply: 'This does not indicate a weakness in delegation. It is a gap in what the session can tell us.'
  }
}];


export const dimensionResults: DimensionResult[] = [
{ dimension: 'delegation', band: 'demonstrated', momentCount: 3, opportunity: 'observed', comparable: true },
{
  dimension: 'description',
  band: null,
  momentCount: 0,
  opportunity: 'capture-failed',
  limitation:
  'A connection interruption prevented capture between 13:38 and 13:40, which covered the only sustained context-setting exchange in this session.',
  comparable: false
},
{ dimension: 'discernment', band: 'consistently-demonstrated', momentCount: 4, opportunity: 'observed', comparable: true },
{ dimension: 'diligence', band: 'consistently-demonstrated', momentCount: 5, opportunity: 'observed', comparable: true }];


export const coverage = [
{ dimension: 'delegation' as DimensionId, opportunities: ['observed', 'observed', 'not-observed'] as OpportunityStateId[] },
{ dimension: 'description' as DimensionId, opportunities: ['presented', 'capture-failed'] as OpportunityStateId[] },
{ dimension: 'discernment' as DimensionId, opportunities: ['observed', 'observed', 'observed', 'observed'] as OpportunityStateId[] },
{ dimension: 'diligence' as DimensionId, opportunities: ['observed', 'observed', 'observed', 'invalid'] as OpportunityStateId[] }];