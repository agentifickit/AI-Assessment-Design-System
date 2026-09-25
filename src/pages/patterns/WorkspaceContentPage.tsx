import { useState } from 'react';
import { MessageSquareIcon, PlayIcon } from 'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { TokenTable } from '../../components/docs/TokenTable';
import { BriefNote, BriefSection } from '../../components/messages/BriefNote';
import { MediaCard } from '../../components/messages/MediaCard';
import { InboxRow, ChannelMark } from '../../components/messages/InboxRow';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { FileGlyph, FileName, type FileKind } from '../../components/ui/FileGlyph';
import { PageTitleInput } from '../../components/ui/PageTitleInput';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { ThreadMarker } from '../../components/ai/ThreadMarker';
import { Message } from '../../components/ai/Message';

const glyphKinds: {kind: FileKind;label: string;}[] = [
{ kind: 'doc', label: 'Document' },
{ kind: 'sheet', label: 'Sheet' },
{ kind: 'pdf', label: 'PDF' },
{ kind: 'image', label: 'Image' },
{ kind: 'email', label: 'Email' },
{ kind: 'link', label: 'Link' },
{ kind: 'note', label: 'Note' }];


const columns = ['A', 'B', 'C', 'D', 'E'];
const rows = [
['Account', 'Seats', 'ARR', 'Asked for', 'Renewed'],
['Northwind', '120', '84,000', '15% off', 'Yes'],
['Fabrikam', '64', '41,600', '10% off', 'Yes'],
['Contoso', '210', '147,000', 'None', 'Yes'],
['Tailspin', '38', '22,800', '20% off', 'No']];


/** The selected range in the specimen grid, B2 to C3: the tint inside, a 2px
 *  ring on its outer edges (a wider collapsed border wins over the 1px line). */
function rangeEdges(r: number, c: number): string {
  if (r < 1 || r > 2 || c < 1 || c > 2) return 'bg-surface';
  return [
  'bg-selection-fill',
  r === 1 && 'border-t-2 border-t-selection',
  r === 2 && 'border-b-2 border-b-selection',
  c === 1 && 'border-l-2 border-l-selection',
  c === 2 && 'border-r-2 border-r-selection'].
  filter(Boolean).join(' ');
}

export function WorkspaceContentPage() {
  const [title, setTitle] = useState('Repositioning note');
  const [untitled, setUntitled] = useState('');

  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Workspace content"
        intro="What the candidate reads and writes inside the shell: the task brief as a note from the manager, property rows, the inbox list, file glyphs, a page title edited in the page, markers in the copilot thread, and the selection in a sheet. Each was composed by the product in the workspace reviews of 2026-09-25 and 2026-09-26 and is folded in here, DS-29 to DS-35." />


      <DocSection
        title="The brief as a note from the manager (DS-31)"
        description="The brief reads as a message, not a form. The sender heads it, then the task's name, then what the unit asks for as properties, then a walkthrough recording when there is one, then the message at reading measure, the materials, and one quiet way to ask about it. The old Deliverable box repeated Hand in and is gone: Hand in is a property.">

        <Example label="BriefNote in the 480px drawer" tone="surface" bodyClassName="p-0">
          <div className="max-w-[480px] border-r border-line">
            <BriefNote
              sender={{ name: 'Dana Okafor', role: 'Head of Marketing', avatar: <Avatar name="Dana Okafor" /> }}
              title="Reposition the mid-market renewal offer"
              properties={[
              { key: 'Hand in', value: 'A one-page note for the renewal team, with the offer you would lead with and why.' },
              { key: 'Unit', value: '2 of 4' }]
              }
              media={
              <MediaCard kind="video" title="Walkthrough from Dana" duration="3:42" transcript="Hi, thanks for picking this up. Neha's patch is yours now. Before you write anything, look at who renewed without the discount.">
                  <div className="flex aspect-video w-full items-center justify-center rounded-sm bg-surface-sunken text-fg-muted">
                    <PlayIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Video player</span>
                  </div>
                </MediaCard>
              }
              materials={[
              { id: 'm1', name: 'Retention by cohort.pdf', onOpen: () => undefined },
              { id: 'm2', name: 'Q3 renewal cohort.xlsx', onOpen: () => undefined },
              { id: 'm3', name: 'Pricing history.md', onOpen: () => undefined }]
              }
              action={<Button size="sm" iconLeft={<MessageSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />}>Ask about this brief</Button>}>

              <BriefSection>
                <p>Neha left on Friday and her mid-market patch is now yours. Renewals open in three weeks and the team wants a position before then.</p>
              </BriefSection>
              <BriefSection title="What I need from you">
                <p>Tell me which offer we lead with for the accounts that asked for a discount last year, and what we say to the ones that did not.</p>
              </BriefSection>
            </BriefNote>
          </div>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Sender', detail: 'A 28px Avatar (a slot, so the caller brings its own), the name at 13px medium, the role at 11px muted. Leave it out when the brief has no memo header; nothing is invented.' },
          { term: 'Title', detail: '18/28 semibold, 16px under the sender.' },
          { term: 'Properties', detail: 'KeyValueList variant="properties", below. Hand in first, then Unit.' },
          { term: 'Media', detail: 'A MediaCard: title and duration over the player, the transcript behind a toggle. Lifted to the top because a manager’s walkthrough is read first.' },
          { term: 'Message', detail: '14/24 in the secondary ink at the 68ch measure, under a hairline. BriefSection gives a headed part a 13px heading.' },
          { term: 'Materials and action', detail: 'Rows with the file glyph and the name without its extension. One secondary button at the foot; the voice conversation will take the same seat.' }]
          } />

      </DocSection>

      <DocSection
        title="Property rows (DS-31)"
        description="KeyValueList variant=properties is how a document states what it asks for, as Linear and ClickUp do above an issue: an 88px label column in the muted 11px step, values in the 13px body ink, 6px between rows, no rules and no fills. Values wrap; labels stay one or two words.">

        <Example label='KeyValueList variant="properties"' tone="surface">
          <KeyValueList
            variant="properties"
            className="max-w-[420px]"
            items={[
            { key: 'Hand in', value: 'A one-page note for the renewal team' },
            { key: 'Unit', value: '2 of 4' },
            { key: 'Due', value: 'End of the session' },
            { key: 'Reference', value: 'PLU-4471', mono: true }]
            } />

        </Example>
        <DoDont
          className="mt-4"
          doText="Use property rows for a document's few standing facts, at the top, read once."
          dontText="Use them for a table of records, or give each property a card or a badge; the rhythm is what makes them scannable." />

      </DocSection>

      <DocSection
        title="Inbox rows and the channel mark (DS-32)"
        description="One row per message: the sender's initials, sender and subject, a two-line preview, then at the right the time, the unread dot and the channel as a 14px mark rather than a repeated word. Slack senders take the square (DS-19). Teams takes the same slot when its PRD adds it.">

        <Example label="InboxRow" tone="surface" bodyClassName="p-0">
          <ul className="max-w-[480px] border-r border-line">
            <InboxRow
              channel="email"
              sender="Daniel Okafor"
              subject="Re: renewal pricing for the mid-market cohort"
              preview="Thanks for picking this up. The two accounts in the sheet renewed last year without the discount they asked for."
              time="09:14"
              unread
              onOpen={() => undefined} />

            <InboxRow
              channel="slack"
              sender="Neha Raman"
              subject="Handover notes"
              preview="The accounts flagged in the sheet are the ones that asked for a discount before the last renewal."
              time="19 Sep"
              active
              onOpen={() => undefined} />

            <InboxRow
              channel="email"
              sender="Board prep"
              subject="Slides due Thursday"
              preview="Pricing slide needs the renewal numbers."
              time="18 Sep"
              onOpen={() => undefined} />

          </ul>
        </Example>
        <Example label="ChannelMark" className="mt-3" tone="surface">
          <div className="flex items-center gap-4 text-13 text-fg-secondary">
            <span className="flex items-center gap-1.5"><ChannelMark channel="email" /> email</span>
            <span className="flex items-center gap-1.5"><ChannelMark channel="slack" /> slack</span>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="File glyphs and names (DS-29)"
        description="A file's kind is a 14px glyph in the ink of its row; kinds differ by shape, never by colour. A PDF shows a small bordered type tag instead of a page glyph, which would read as the candidate's own document. Names are shown without their extension, since the glyph already says it; screen readers still hear it.">

        <Example label="FileGlyph kinds" tone="surface">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-13 text-fg-secondary">
            {glyphKinds.map((g) =>
            <li key={g.kind} className="flex items-center gap-2">
                <FileGlyph kind={g.kind} className="text-fg-muted" />
                {g.label}
              </li>
            )}
          </ul>
        </Example>
        <Example label="FileName" className="mt-3" tone="surface">
          <ul className="grid max-w-[320px] gap-1 text-13 text-fg-secondary">
            {['Retention by cohort.pdf', 'Q3 renewal cohort.xlsx', 'Pricing history.md', 'Board deck notes'].map((n) =>
            <li key={n} className="flex h-7 items-center gap-2">
                <FileGlyph name={n} className="text-fg-muted" />
                <FileName name={n} />
              </li>
            )}
          </ul>
        </Example>
      </DocSection>

      <DocSection
        title="A page title edited in the page (DS-33)"
        description="A document's name is its heading, edited where it is shown, as in Notion: a borderless field in the heading-1 step, the same name the tab and the sidebar show. Enter moves on to the body; Escape restores the name. An empty title shows the placeholder in the muted ink.">

        <Example label="PageTitleInput" tone="surface">
          <div className="max-w-[640px]">
            <PageTitleInput value={title} onCommit={(t) => setTitle(t || 'Untitled')} />
            <p className="mt-3 text-base leading-[26px] text-fg-secondary">
              Lead with the renewal terms the two accounts already accepted, then the discount question.
            </p>
            <div className="mt-8">
              <PageTitleInput value={untitled} onCommit={setUntitled} label="Second page title" />
              <p className="mt-3 text-base leading-[26px] text-fg-muted">Write here, or ask the copilot for a draft you can edit.</p>
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Thread markers (DS-34)"
        description="Where a copilot thread's context changes, a quiet marker says so: turns carried from an earlier unit sit under the unit's name, this unit's under This unit. 11px muted text between two hairlines. Not a heading, never the accent.">

        <Example label="ThreadMarker" tone="surface">
          <div className="max-w-[440px] space-y-3">
            <ThreadMarker>Unit 1</ThreadMarker>
            <Message author="user" authorLabel="You">Which accounts churned after a discount last year?</Message>
            <Message author="assistant" authorLabel="Copilot" attribution={false}>None of the four in the cohort sheet churned. Two had asked for a discount; neither got one.</Message>
            <ThreadMarker>This unit</ThreadMarker>
            <Message author="user" authorLabel="You">Draft the opening of the renewal note.</Message>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Selection in a grid (DS-35)"
        description="A sheet selects in the brand orange, as the rest of the workspace focuses in it, not in a grid engine's blue. The ring carries the state at 3:1; the range takes a 10% tint that leaves its text at full contrast. The fill handle and the selected row and column header marks take the ring colour. Selection joins focus, the primary action and the live dot as a sanctioned accent use; it is small and it is where the candidate is looking.">

        <Example label="Selected range B2 to C3" tone="surface">
          <table className="border-collapse text-13 tnum" aria-label="Renewal cohort, specimen">
            <thead>
              <tr>
                <th className="h-6 w-8 border border-line bg-surface-subtle" />
                {columns.map((c, ci) =>
                <th
                  key={c}
                  scope="col"
                  className={`h-6 min-w-[88px] border border-line bg-surface-subtle text-2xs font-medium text-fg-muted ${ci >= 1 && ci <= 2 ? 'border-b-2 border-b-selection text-fg-primary' : ''}`}>

                    {c}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) =>
              <tr key={ri}>
                  <th
                  scope="row"
                  className={`h-7 border border-line bg-surface-subtle text-2xs font-medium text-fg-muted ${ri >= 1 && ri <= 2 ? 'border-r-2 border-r-selection text-fg-primary' : ''}`}>

                    {ri + 1}
                  </th>
                  {row.map((cell, ci) =>
                <td
                  key={ci}
                  className={`relative h-7 border border-line px-2 text-fg-primary ${ri === 0 ? 'font-medium' : ''} ${rangeEdges(ri, ci)}`}>
                  
                      {cell}
                      {ri === 2 && ci === 2 &&
                  <span aria-hidden="true" className="absolute -bottom-[4px] -right-[4px] z-10 h-1.5 w-1.5 border border-surface bg-selection" />
                  }
                    </td>
                )}
                </tr>
              )}
            </tbody>
          </table>
        </Example>
        <TokenTable
          className="mt-4"
          caption="Selection tokens"
          showDark={false}
          rows={[
          { name: '--selection-ring', value: '→ --brand-accent', usage: 'The range ring (2px), the fill handle, the selected header marks.' },
          { name: '--selection-fill', value: '→ --brand-accent at 10%', usage: 'The tint inside the range. Never the only cue.' }]
          } />

        <SpecList
          className="mt-4"
          entries={[
          { term: 'Grid engines', detail: 'An engine that draws its own selection (FortuneSheet in the product) takes these two variables in its stylesheet overrides; nothing else of the engine’s chrome needs to change.' },
          { term: 'Not a selected row', detail: 'A selected row in a list or table stays --surface-selected with a left marker. The grid tint is for ranges of cells.' }]
          } />

      </DocSection>
    </>);

}
