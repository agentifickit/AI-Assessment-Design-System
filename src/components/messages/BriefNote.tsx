import React from 'react';
import { cn } from '../../utils/cn';
import { KeyValueList, type KeyValueItem } from '../ui/KeyValueList';
import { FileGlyph, FileName } from '../ui/FileGlyph';

export interface BriefMaterial {
  id: string;
  /** The stored file name; it is shown without its extension. */
  name: string;
  onOpen: () => void;
}

export interface BriefNoteProps {
  /** Who the brief is from, in the scenario: the hiring manager. */
  sender?: {name: string;role?: string;avatar?: React.ReactNode;};
  title: string;
  /** What the unit asks for, as properties: Hand in, Unit, Due. */
  properties?: KeyValueItem[];
  /** A walkthrough recording, as a MediaCard. */
  media?: React.ReactNode;
  /** The message: prose, in BriefSection blocks when it has headings. */
  children: React.ReactNode;
  materials?: BriefMaterial[];
  /** One quiet action at the foot: a secondary "Ask about this brief". */
  action?: React.ReactNode;
  className?: string;
}

/** A task brief written as a note from the manager, not as a form. The sender
 *  heads it (avatar, name, role), then the task's name, then what the unit
 *  asks for as properties, then a walkthrough recording when there is one,
 *  then the message itself at reading measure, the materials as a list, and
 *  one way to ask about it. There is no separate deliverable box: "Hand in" is
 *  a property. Direction chosen with Pulkit on 2026-09-25 from Linear's and
 *  ClickUp's property rows and a manager's memo. DS-39. */
export function BriefNote({ sender, title, properties = [], media, children, materials = [], action, className }: BriefNoteProps) {
  return (
    <article aria-label={title} className={cn('px-6 py-5', className)}>
      {sender &&
      <div className="flex items-center gap-2.5">
          {sender.avatar}
          <div className="min-w-0">
            <p className="truncate text-13 font-medium leading-5 text-fg-primary">{sender.name}</p>
            {sender.role && <p className="truncate text-2xs leading-4 text-fg-muted">{sender.role}</p>}
          </div>
        </div>
      }

      <h1 className={cn('text-lg font-semibold leading-7 text-fg-primary', sender && 'mt-4')}>{title}</h1>

      {properties.length > 0 && <KeyValueList variant="properties" items={properties} className="mt-3" />}

      {media && <div className="mt-5">{media}</div>}

      <div className="mt-5 max-w-measure border-t border-line-subtle pt-4 text-sm leading-6 text-fg-secondary">{children}</div>

      {materials.length > 0 &&
      <section className="mt-6" aria-label="Materials">
          <h2 className="text-2xs font-medium text-fg-muted">Materials</h2>
          <ul className="mt-1.5">
            {materials.map((m) =>
          <li key={m.id}>
                <button
              type="button"
              onClick={m.onOpen}
              className="-mx-2 flex h-8 w-[calc(100%+16px)] items-center gap-2 rounded-sm px-2 text-left text-13 text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">
              
                  <FileGlyph name={m.name} className="text-fg-muted" />
                  <FileName name={m.name} />
                </button>
              </li>
          )}
          </ul>
        </section>
      }

      {action && <div className="mt-6">{action}</div>}
    </article>);

}

export interface BriefSectionProps {
  /** Leave it out for the opening paragraphs. */
  title?: string;
  children: React.ReactNode;
}

/** One headed part of the brief's message, with a 13px heading. */
export function BriefSection({ title, children }: BriefSectionProps) {
  return (
    <section aria-label={title} className="mt-4 first:mt-0">
      {title && <h2 className="mb-1 text-13 font-semibold text-fg-primary">{title}</h2>}
      <div className="space-y-3">{children}</div>
    </section>);

}
