export interface Principle {
  number: string;
  title: string;
  body: string;
  consequence: string;
}

export const principles: Principle[] = [
{
  number: '01',
  title: 'Evidence before conclusion',
  body:
  'Nothing in this product asserts something about a person without a path back to what actually happened in their session.',
  consequence:
  'Every interpretation renders with its linked moments. A conclusion with no linked evidence renders in an explicitly incomplete state and cannot be approved as written.'
},
{
  number: '02',
  title: 'The human signs it',
  body:
  'AI drafts the reading. A named person owns the conclusion. The interface never blurs which is which.',
  consequence:
  'AI-authored regions are subordinate: tinted surface, 2px left rule, attribution row reading “AI-generated draft”. Only reviewer-approved content gets full-weight text on a solid surface with a name and timestamp.'
},
{
  number: '03',
  title: 'Absence is a state, not a zero',
  body:
  'A behaviour that was not observed is different from a behaviour done badly, and different again from one the task never gave a chance to show.',
  consequence:
  'Incomplete evidence, invalid opportunity, and unmeasured behaviour are first-class states with their own glyphs and copy. They never collapse into a low rating and never render as a blank cell.'
},
{
  number: '04',
  title: 'Calm under the clock',
  body:
  'A candidate is being assessed. The interface must not add pressure that the task itself did not create.',
  consequence:
  'No pulsing, no red countdown, no celebratory animation on submit. The timer shifts emphasis by weight and wording. Candidate surfaces spend motion only on press feedback, panel resize, and notifications.'
},
{
  number: '05',
  title: 'Density is a service to the reader',
  body:
  'A reviewer reads hours of session material. Compression is what makes that possible — but not at the cost of comprehension.',
  consequence:
  'Density comes from tighter spacing and hairline rules, never from type below 13px or from dropping labels. Three density modes share one spacing logic.'
},
{
  number: '06',
  title: 'Categorical, never graded',
  body:
  'Assessment states are kinds of observation, not tiers of quality. A scorecard would imply a precision the evidence does not support.',
  consequence:
  'No traffic-light palette, no gauges, no numeric scores, no hire/reject recommendation anywhere in the system. Hue separates categories; glyph and label carry the meaning.'
}];