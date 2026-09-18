import React, { useEffect, useState } from 'react';

export type StreamPhase = 'idle' | 'streaming' | 'complete' | 'interrupted' | 'failed';

export interface StreamAnnouncerProps {
  phase: StreamPhase;
  /** Named so the announcement says what finished, not just "done". */
  subject?: string;
}

const copy: Record<Exclude<StreamPhase, 'idle'>, (s: string) => string> = {
  streaming: (s) => `${s} is generating a response.`,
  complete: (s) => `${s} finished responding.`,
  interrupted: (s) => `${s} response stopped.`,
  failed: (s) => `${s} response failed. You can retry.`
};

/** One polite live region per conversation thread.
 *
 *  It announces exactly four events — started, completed, interrupted,
 *  failed — and never token text. Announcing every token makes a screen
 *  reader unusable during a stream, which is the intuitive and wrong default.
 *  The streaming message itself is marked aria-busy with aria-live="off" so
 *  assistive technology does not read a growing buffer. */
export function StreamAnnouncer({ phase, subject = 'The assistant' }: StreamAnnouncerProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (phase === 'idle') {
      setMessage('');
      return;
    }
    setMessage(copy[phase](subject));
  }, [phase, subject]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>);

}