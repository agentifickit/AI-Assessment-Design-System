import React from 'react';
import type { EvidenceStateId } from '../../types/system';

export interface EvidenceGlyphProps {
  state: EvidenceStateId;
  size?: number;
  className?: string;
}

/** Every evidence state has a distinct shape so the system stays legible in greyscale,
 *  in high-contrast mode, and to anyone who cannot separate the hues. */
export function EvidenceGlyph({ state, size = 12, className }: EvidenceGlyphProps) {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 12 12',
    className,
    'aria-hidden': true as const,
    focusable: 'false' as const
  };
  const stroke = 'currentColor';

  switch (state) {
    case 'positive':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" fill={stroke} />
        </svg>);

    case 'development':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.6" />
        </svg>);

    case 'neutral':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.6" fill={stroke} />
        </svg>);

    case 'incomplete':
      return (
        <svg {...common}>
          <rect
            x="2"
            y="2"
            width="8"
            height="8"
            rx="1.5"
            fill="none"
            stroke={stroke}
            strokeWidth="1.6"
            strokeDasharray="2.6 2" />
          
        </svg>);

    case 'invalid':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M3 9 L9 3" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        </svg>);

    case 'unmeasured':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.2" />
          <path d="M2.6 7 L7 2.6 M4.4 9.4 L9.4 4.4" stroke={stroke} strokeWidth="1" />
        </svg>);

    case 'disagreement':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M6 2 L6 10 L10 10 L10 2 Z" fill={stroke} />
        </svg>);

    case 'overridden':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M1 6 L11 6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>);

    case 'approved':
      return (
        <svg {...common}>
          <rect x="1.4" y="1.4" width="9.2" height="9.2" rx="1.6" fill={stroke} />
          <path
            d="M3.6 6.1 L5.3 7.8 L8.5 4.4"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
        </svg>);

    case 'escalation':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path
            d="M4.6 7.4 L6 4.8 L7.4 7.4"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
        </svg>);

    default:
      return null;
  }
}