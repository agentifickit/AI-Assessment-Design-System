import React from 'react';
import type { OpportunityStateId } from '../../types/framework';

export interface OpportunityGlyphProps {
  state: OpportunityStateId;
  size?: number;
  className?: string;
}

/** Opportunity glyphs are circular, where evidence glyphs are square. That one
 *  structural difference lets a reader tell the two vocabularies apart at a
 *  glance, before reading either label. */
export function OpportunityGlyph({ state, size = 12, className }: OpportunityGlyphProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 12 12',
    className,
    'aria-hidden': true as const,
    focusable: 'false' as const
  };
  const stroke = 'currentColor';

  switch (state) {
    // An open circle: the door exists.
    case 'presented':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4.2" fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>);

    // Filled: taken.
    case 'observed':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4.4" fill={stroke} />
        </svg>);

    // Open circle with a dot absent from centre — present but unused.
    case 'not-observed':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4.2" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="6" cy="6" r="1.1" fill={stroke} opacity="0.45" />
        </svg>);

    // Struck through: the chance itself was not sound.
    case 'invalid':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4.2" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M3.1 8.9 L8.9 3.1" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        </svg>);

    // Broken outline: the record has holes in it.
    case 'capture-failed':
      return (
        <svg {...common}>
          <circle
            cx="6"
            cy="6"
            r="4.2"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="2.4 2" />
          
        </svg>);

    // Faint outline: outside the frame entirely.
    case 'not-assessed':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4.2" fill="none" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <path d="M2.4 6 L9.6 6" stroke={stroke} strokeWidth="1" opacity="0.7" />
        </svg>);

    default:
      return null;
  }
}