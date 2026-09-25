import React, { useId, useState } from 'react';
import { MicIcon, VideoIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MediaCardProps {
  kind: 'video' | 'audio';
  /** "Walkthrough from Dana", "Voice note". */
  title: string;
  /** "3:42", once the media's metadata has loaded. */
  duration?: string;
  /** Draws a native player with controls. Pass `children` instead to supply your own. */
  src?: string;
  children?: React.ReactNode;
  /** Shown on request under the player. Recorded media always carries one. */
  transcript?: string;
  className?: string;
}

/** A recording inside a document: a manager's walkthrough video or a voice
 *  note. A bordered card on the subtle surface with the title and duration
 *  above the player and the transcript behind a quiet toggle. It sits in the
 *  brief's media slot, above the message, where a walkthrough belongs. DS-39. */
export function MediaCard({ kind, title, duration, src, children, transcript, className }: MediaCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptId = useId();
  const Icon = kind === 'audio' ? MicIcon : VideoIcon;

  return (
    <figure className={cn('rounded-md border border-line bg-surface-subtle p-2.5', className)}>
      <figcaption className="mb-1.5 flex items-center gap-1.5 text-2xs font-medium text-fg-secondary">
        <Icon className="h-3 w-3 shrink-0 text-fg-muted" aria-hidden="true" />
        <span className="truncate">{title}</span>
        {duration && <span className="ml-auto shrink-0 text-2xs font-normal text-fg-muted tnum">{duration}</span>}
      </figcaption>
      {children ?? (
      src ?
      kind === 'video' ?
      <video controls src={src} className="w-full rounded-sm" /> :

      <audio controls src={src} className="w-full" /> :

      null)}
      {transcript &&
      <>
          <button
          type="button"
          aria-expanded={showTranscript}
          aria-controls={transcriptId}
          onClick={() => setShowTranscript((v) => !v)}
          className="mt-1.5 rounded-xs text-2xs font-medium text-fg-muted transition-colors duration-100 ease-enter hover:text-fg-primary">
          
            {showTranscript ? 'Hide transcript' : 'Show transcript'}
          </button>
          {showTranscript &&
        <p id={transcriptId} className="mt-1 whitespace-pre-wrap rounded-sm bg-surface p-2 text-2xs leading-relaxed text-fg-secondary">
              {transcript}
            </p>
        }
        </>
      }
    </figure>);

}
