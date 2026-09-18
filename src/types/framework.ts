import type { BehaviourBand } from './system';

/** The four AI-fluency dimensions. Stable order everywhere: DL, DS, DC, DG. */
export type DimensionId = 'delegation' | 'description' | 'discernment' | 'diligence';

export interface DimensionSpec {
  id: DimensionId;
  /** Two-letter code, set in mono. The dimension's visual identity — no hue. */
  code: string;
  label: string;
  /** One line, plain language, no jargon. */
  description: string;
  /** What a reviewer can actually see in a session. */
  observables: string[];
  /** Exact wording used when this dimension could not be measured. */
  unmeasuredCopy: string;
}

/** Whether the assessment ever got a fair chance to observe a behaviour.
 *  Deliberately separate from EvidenceStateId: evidence states describe what
 *  a captured observation IS, these describe whether it could exist at all. */
export type OpportunityStateId =
'presented' |
'observed' |
'not-observed' |
'invalid' |
'capture-failed' |
'not-assessed';

export interface OpportunityStateSpec {
  id: OpportunityStateId;
  label: string;
  meaning: string;
  /** True only for `observed`. The three non-observing states can never be
   *  rendered inside a rating control — enforced by the component API. */
  supportsFinding: boolean;
  /** Whether this state is an absence rather than a result. */
  isAbsence: boolean;
  fg: string;
  bg: string;
  border: string;
}

export interface DimensionResult {
  dimension: DimensionId;
  band: BehaviourBand | null;
  /** Number of linked moments supporting the band. */
  momentCount: number;
  opportunity: OpportunityStateId;
  /** Set when opportunity is not `observed` — explains why, in our words. */
  limitation?: string;
  /** Whether this dimension can be compared across candidates. */
  comparable: boolean;
}