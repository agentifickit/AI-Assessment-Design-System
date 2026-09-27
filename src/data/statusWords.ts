/** The status words for an attempt and its report, and the one tone map they
 *  share in the candidate pipeline, the verification queue and the report.
 *  V1 Decision Log, 2026-09-27: PLU-097 D-4, PLU-105 D-17 and DS-26.
 *
 *  Rendered as `Badge` with `dot`, the word always present. The word is the
 *  signal; the tone only helps someone find a state again. An approved report
 *  takes no hue: Verified is neutral, with the check glyph in place of the dot.
 *  "Verified" describes the report a Plural reviewer checked and released,
 *  never the candidate as a person, and never a machine check. */

export type StatusWordId =
'invited' |
'in-progress' |
'scoring' |
'awaiting-verification' |
'verified' |
'cancelled' |
'expired' |
'scored' |
'scoring-failed' |
'incomplete-attempt' |
'not-verified';

export interface StatusWord {
  id: StatusWordId;
  /** Copy, verbatim. Never paraphrased locally. */
  label: string;
  /** A `Badge` tone. */
  tone: 'neutral' | 'info' | 'danger';
  /** What sits before the word: the tone's dot, or the check glyph for Verified. */
  glyph: 'dot' | 'check';
  /** Scored and Scoring failed stay in the Plural admin queue. */
  adminOnly: boolean;
  meaning: string;
}

export const statusWords: StatusWord[] = [
{
  id: 'invited',
  label: 'Invited',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The link has been sent and the attempt has not started.'
},
{
  id: 'in-progress',
  label: 'In progress',
  tone: 'info',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The candidate has started the attempt.'
},
{
  id: 'scoring',
  label: 'Scoring',
  tone: 'info',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The attempt is submitted and is being scored.'
},
{
  id: 'awaiting-verification',
  label: 'Awaiting verification',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'Scored, and waiting for a Plural reviewer to check it.'
},
{
  id: 'verified',
  label: 'Verified',
  tone: 'neutral',
  glyph: 'check',
  adminOnly: false,
  meaning: 'A Plural reviewer checked the report and released it. The report names who, and when.'
},
{
  id: 'cancelled',
  label: 'Cancelled',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The invitation was cancelled.'
},
{
  id: 'expired',
  label: 'Expired',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The invitation link passed its expiry date.'
},
{
  id: 'scored',
  label: 'Scored',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: true,
  meaning: 'Scoring finished and the report waits in the verification queue. Outside the queue it reads Awaiting verification.'
},
{
  id: 'scoring-failed',
  label: 'Scoring failed',
  tone: 'danger',
  glyph: 'dot',
  adminOnly: true,
  meaning: 'Scoring did not finish. The fault is ours, and an admin runs it again.'
},
{
  id: 'incomplete-attempt',
  label: 'Incomplete attempt',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'The session ended before every unit was submitted, so the attempt is not scored.'
},
{
  id: 'not-verified',
  label: 'Not verified',
  tone: 'neutral',
  glyph: 'dot',
  adminOnly: false,
  meaning: 'A Plural reviewer checked the report and did not release it. The admin queue files these under Rejected.'
}];


export const statusWordMap = Object.fromEntries(
  statusWords.map((s) => [s.id, s])
) as Record<StatusWordId, StatusWord>;
