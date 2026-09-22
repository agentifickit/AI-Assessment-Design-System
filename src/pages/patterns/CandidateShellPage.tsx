import React, { useState } from 'react';
import { FileTextIcon, InboxIcon, MessageSquareIcon, PlusIcon, SparklesIcon, TableIcon } from 'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { StatusBar } from '../../components/layout/StatusBar';
import { Sidebar, type SidebarMode } from '../../components/layout/Sidebar';
import { MinimisedPanelButton } from '../../components/layout/MinimisedPanelButton';
import { Tabs } from '../../components/ui/Tabs';
import { Drawer } from '../../components/ui/Drawer';
import { SearchLightbox, type SearchRow } from '../../components/ui/SearchLightbox';
import { MessageReader } from '../../components/messages/MessageReader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { SaveStatus } from '../../components/assessment/SaveStatus';
import { Message } from '../../components/ai/Message';

const tabItems = [
{ id: 'note', label: 'Repositioning note', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'sheet', label: 'Renewal cohort', icon: <TableIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'inbox', label: 'Inbox', icon: <InboxIcon className="h-3.5 w-3.5" aria-hidden="true" />, count: 3 }];


const createRows: SearchRow[] = [
{ id: 'new-page', label: 'New page', icon: <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'new-sheet', label: 'New sheet', icon: <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" /> }];

const searchRows: SearchRow[] = [
{ id: 'brief', label: 'Task brief', meta: 'Reference', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'note', label: 'Repositioning note', meta: 'Edited 2 min ago', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'mail', label: 'Re: renewal pricing for the mid-market cohort', meta: 'Email', icon: <InboxIcon className="h-3.5 w-3.5" aria-hidden="true" /> }];


export function CandidateShellPage() {
  const [tab, setTab] = useState('note');
  const [sidebar, setSidebar] = useState<SidebarMode>('docked');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = searchRows.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()));

  const reader =
  <MessageReader
    source="slack"
    subject="Renewal pricing for the mid-market cohort"
    sender={{ name: 'Neha Raman', meta: 'Account management' }}
    timestamp="Fri 19 Sep, 16:42"
    attachments={[{ id: 'a1', name: 'Q3 renewal cohort.xlsx' }]}>
    
      <p>Hi, Neha left on Friday and her patch is now yours. The two accounts flagged in the sheet are the ones that asked for a discount before the last renewal.</p>
      <p className="mt-3">I would not lead with price. Ask the assistant what the retention data actually says before you commit to a number.</p>
    </MessageReader>;


  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Candidate shell"
        intro="Approved with the candidate workspace migration (PRD-08, handoff PLU-123 v1.1, 2026-09-22). The candidate's page is the work surface; everything else is a quiet frame around it. A 240px sidebar that docks, hides and peeks, browser-style tabs in the top bar, a 32px status bar, reference content in a drawer that can pin, search in a lightbox, and the assistant minimising to one floating button. Eleven decisions, DS-3 and DS-10 to DS-19, are recorded here." />
      

      <DocSection
        title="Rules that changed"
        description="Three corrections to existing components, each approved on 2026-09-22.">
        
        <SpecList
          entries={[
          { term: 'DS-3, probes are radio groups', detail: 'A probe asks the candidate for a judgement, not a magnitude. It is a stacked RadioGroup with a visible marker, never a slider. The product’s ProbeCard composes RadioGroup.' },
          { term: 'DS-10, SaveStatus joins with a comma', detail: <>"Your work is saved, 12s ago". A middle dot between the parts reads as machine copy. <SaveStatus state="saved" savedAt="12s ago" className="ml-2" /></> },
          { term: 'DS-11, Message attribution is optional', detail: 'Where the container already names the author (a copilot column titled with the assistant’s name) pass attribution={false}. The accessible name still carries the author.' }]
          } />
        
        <Example label="Message with attribution={false} inside a titled column" className="mt-3" tone="surface">
          <div className="max-w-[420px] border border-line">
            <div className="flex h-9 items-center gap-2 border-b border-line-subtle bg-surface-subtle px-3 text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" /> Copilot
            </div>
            <div className="px-3 pb-3">
              <Message author="assistant" authorLabel="Copilot" attribution={false}>
                The sheet lists two accounts that asked for a discount at the last renewal. Neither churned.
              </Message>
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Sidebar (DS-14)"
        description="240px, replacing the 48px icon rail for the candidate. Docked it is a column in the flow. Hidden, a 12px hot edge on the left peeks the same panel as a floating overlay on hover or focus; clicking the edge docks it again. The shell never remounts its children when the mode changes.">
        
        <Example label={`Sidebar, mode ${sidebar}`} note="Hover the left edge when hidden">
          <div className="relative flex h-[320px] overflow-hidden border border-line bg-canvas">
            <Sidebar
              label="Session"
              mode={sidebar}
              onModeChange={setSidebar}
              header={<div className="flex items-center gap-2"><Avatar name="Priya Shah" size="sm" /><span className="truncate text-13 font-medium text-fg-primary">Priya Shah</span></div>}
              footer={<Button variant="secondary" size="sm" fullWidth>Submit work</Button>}>
              
              <ul className="px-2 text-13 text-fg-secondary">
                {['Task brief', 'Repositioning note', 'Renewal cohort', 'Inbox'].map((l) =>
                <li key={l} className="rounded-xs px-2 py-1.5 hover:bg-surface-hover">{l}</li>
                )}
              </ul>
            </Sidebar>
            <div className="flex-1 p-4 text-13 text-fg-muted">The page is the work surface.</div>
          </div>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Anatomy', detail: '48px header (workspace row and the hide control), one scroll container, a footer outside it for settings and the quiet Submit.' },
          { term: 'Modes', detail: 'docked, hidden, peek. Peek is an overlay with the dialog shadow, inset 12px, and closes when the pointer leaves.' },
          { term: 'Accessibility', detail: 'A nav landmark named by the label. The hot edge is a real button, "Show sidebar", so keyboard users can peek and dock it.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Browser tabs (DS-15)"
        description="The open pages sit in the full-width top bar as browser-style tabs. The active tab is white with a three-side border and no bottom border, so it merges into the page below; inactive tabs take the same outline on the sunken strip and share edges with their neighbour. The strip hairline runs full width and stops under the active tab.">
        
        <Example label="Tabs variant=browser" bodyClassName="p-0">
          <Tabs variant="browser" label="Open pages" items={tabItems} value={tab} onChange={setTab} />
          <div className="h-16 bg-surface" />
        </Example>
        <DoDont
          className="mt-4"
          doText="Keep the strip on the sunken surface and let the active tab's white run into the page. Counts are the only badge a tab carries."
          dontText="Put an accent underline or an accent fill on the active tab; the candidate shell spends its accent on the unread badge, the copilot send and the submit dialog." />
        
      </DocSection>

      <DocSection
        title="Status bar (DS-12)"
        description="A 32px bottom bar of mono small-caps segments: candidate, connection, save state, and a trailing slot for the timer. Segments use the status type style (10/16 mono caps, tracked) because they are instrumentation. What the timer shows is a product decision and is outside PRD-08; the bar only reserves the seat.">
        
        <Example label="StatusBar" bodyClassName="p-0">
          <div className="h-10 bg-surface" />
          <StatusBar
            segments={[
            { id: 'who', label: 'Priya Shah' },
            { id: 'conn', label: 'Connection stable', live: true },
            { id: 'save', label: 'Saved, 12s ago', live: true }]
            }
            trailing="41:12" />
          
        </Example>
        <Example label="StatusBar, connection lost" className="mt-3" bodyClassName="p-0">
          <StatusBar
            segments={[
            { id: 'who', label: 'Priya Shah' },
            { id: 'conn', label: 'Connection lost', tone: 'danger', live: true },
            { id: 'save', label: 'Kept on this device', tone: 'warning', live: true }]
            }
            trailing="41:12" />
          
        </Example>
      </DocSection>

      <DocSection
        title="Drawer (DS-16)"
        description="Reference content (the brief, the inbox) opens over the page as a 480px drawer from the right. It can pin, becoming a 400px column in the flow where the caller places it. This amends PRD-08 decision D-2: the reference panel is not a third permanent pane.">
        
        <Example label="Drawer, floating then pinned">
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => { setPinned(false); setDrawerOpen(true); }}>Open as drawer</Button>
            <Button size="sm" variant="tertiary" onClick={() => { setPinned(true); setDrawerOpen(true); }}>Open pinned</Button>
          </div>
          <div className="mt-3 flex h-[360px] overflow-hidden border border-line bg-surface">
            <div className="flex-1 p-4 text-13 text-fg-muted">The page keeps its width until the drawer pins.</div>
            <Drawer
              open={drawerOpen && pinned}
              pinned
              onPinChange={setPinned}
              onClose={() => setDrawerOpen(false)}
              eyebrow="Inbox"
              title="Renewal pricing for the mid-market cohort">
              
              {reader}
            </Drawer>
          </div>
          <Drawer
            open={drawerOpen && !pinned}
            pinned={false}
            onPinChange={setPinned}
            onClose={() => setDrawerOpen(false)}
            eyebrow="Inbox"
            title="Renewal pricing for the mid-market cohort">
            
            {reader}
          </Drawer>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Widths', detail: '480px floating (max 90% of the viewport), 400px pinned. The pinned column takes a left hairline and no shadow.' },
          { term: 'Header', detail: '48px: small-caps eyebrow for the source, the title, then pin and close at the right.' },
          { term: 'Keyboard', detail: 'Escape closes a floating drawer. A pinned column is closed with its own control so a keystroke cannot remove a pane the candidate arranged.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Search lightbox (DS-17)"
        description="Search is a centred lightbox over a scrim, not a field in the shell. The new-tab variant carries create rows above the results, so one control opens a page, a sheet or an existing item.">
        
        <Example label="SearchLightbox with create rows">
          <Button size="sm" iconLeft={<PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />} onClick={() => setSearchOpen(true)}>New tab</Button>
          <SearchLightbox
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            label="Search this session or create"
            value={query}
            onChange={setQuery}
            results={filtered}
            createRows={createRows}
            onSelect={() => setSearchOpen(false)} />
          
        </Example>
      </DocSection>

      <DocSection
        title="Message reader (DS-18) and the square avatar (DS-19)"
        description="One message opened from the inbox: subject, sender meta with the source as a micro label, body at reading measure, attachment chips, then the reply seat. Slack senders take the square avatar so the source is legible without the label; people are otherwise always circles. The inbox, replying and the timer are drawn in the handoff but are outside PRD-08 and wait for their own PRD.">
        
        <div className="grid gap-3">
          <Example label="MessageReader width=page" bodyClassName="p-0">
            <div className="flex h-[360px] flex-col bg-surface">
              <MessageReader
                width="page"
                source="email"
                subject="Re: renewal pricing for the mid-market cohort"
                sender={{ name: 'Daniel Okafor', meta: 'daniel.okafor@example.com' }}
                timestamp="Mon 22 Sep, 09:14"
                attachments={[{ id: 'b1', name: 'Retention by cohort.pdf' }]}
                reply={<div className="rounded-sm border border-line bg-surface-subtle px-3 py-2 text-13 text-fg-muted">Reply composer seat</div>}>
                
                <p>Thanks for picking this up. The two accounts in the sheet renewed last year without the discount they asked for, which is worth knowing before you write the note.</p>
              </MessageReader>
            </div>
          </Example>
          <Example label="Avatar shapes" tone="surface">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Daniel Okafor" /> circle, people</span>
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Neha Raman" shape="square" /> square, Slack authorship only</span>
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Priya Shah" size="xs" /> xs, initials in the badge style</span>
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection
        title="Minimised assistant (DS-13)"
        description="The assistant column does not collapse to a labelled edge tab. It minimises to a 40px floating button at the bottom right of the work surface, with the unread count as one of the shell's three accent uses. CollapsedEdgeTab stays the rule for panels whose label must remain visible.">
        
        <Example label="MinimisedPanelButton with 2 unread">
          <div className="relative h-32 border border-line bg-surface">
            <MinimisedPanelButton label="Open copilot" icon={<MessageSquareIcon className="h-4 w-4" aria-hidden="true" />} count={2} onExpand={() => undefined} />
          </div>
        </Example>
      </DocSection>
    </>);

}
