export type Theme = 'light' | 'dark';
export type Density = 'compact' | 'default' | 'comfortable';

export type EvidenceStateId =
'positive' |
'development' |
'neutral' |
'incomplete' |
'invalid' |
'unmeasured' |
'disagreement' |
'overridden' |
'approved' |
'escalation';

export interface EvidenceStateSpec {
  id: EvidenceStateId;
  label: string;
  /** Short definition used in the reference table and in tooltips. */
  meaning: string;
  /** Glyph name — rendered by <EvidenceGlyph>. Greyscale-legible. */
  glyph: EvidenceStateId;
  fg: string;
  bg: string;
  border: string;
}

export type ConfidenceBand = 'high' | 'moderate' | 'low' | 'insufficient';

export type BehaviourBand =
'consistently-demonstrated' |
'demonstrated' |
'partially-demonstrated' |
'not-observed';

export interface TokenRow {
  name: string;
  value: string;
  dark?: string;
  usage: string;
  note?: string;
}