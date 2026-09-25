import React, { useState } from 'react';
import {
  BookOpenIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  InboxIcon,
  LockIcon,
  MessageSquareIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  Table2Icon,
  TableIcon } from
'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { StatusBar, StatusBarButton } from '../../components/layout/StatusBar';
import { Sidebar, SidebarItem, SidebarSection, SidebarSeeAll, type SidebarMode } from '../../components/layout/Sidebar';
import { MinimisedPanelButton } from '../../components/layout/MinimisedPanelButton';
import { PanelSeparator } from '../../components/layout/PanelSeparator';
import { Tabs, type TabItem } from '../../components/ui/Tabs';
import { Drawer } from '../../components/ui/Drawer';
import { SearchLightbox, type SearchRow } from '../../components/ui/SearchLightbox';
import { MessageReader } from '../../components/messages/MessageReader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { StateLabel } from '../../components/ui/StateLabel';
import { FileGlyph, FileName } from '../../components/ui/FileGlyph';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { Popover } from '../../components/ui/Popover';
import { MenuLabel } from '../../components/ui/Menu';
import { SaveStatus } from '../../components/assessment/SaveStatus';
import { Message } from '../../components/ai/Message';

const legacyTabs = [
{ id: 'note', label: 'Repositioning note', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'sheet', label: 'Renewal cohort', icon: <TableIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'inbox', label: 'Inbox', icon: <InboxIcon className="h-3.5 w-3.5" aria-hidden="true" />, count: 3 }];


const glyph = (kind: 'doc' | 'sheet' | 'pdf') => <FileGlyph kind={kind} className="text-fg-muted" />;

const initialTabs: TabItem[] = [
{ id: 'brief', label: 'Task brief', icon: <BookOpenIcon className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />, pinned: true },
{ id: 'note', label: 'Repositioning note', icon: glyph('doc'), renameable: true },
{ id: 'sheet', label: 'Renewal cohort', icon: glyph('sheet') },
{ id: 'retention', label: 'Retention by cohort', icon: glyph('pdf') }];


const createRows: SearchRow[] = [
{ id: 'new-page', label: 'New page', icon: <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'new-sheet', label: 'New sheet', icon: <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" /> }];

const searchRows: SearchRow[] = [
{ id: 'brief', label: 'Task brief', meta: 'Reference', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'note', label: 'Repositioning note', meta: 'Edited 2 min ago', icon: <FileTextIcon className="h-3.5 w-3.5" aria-hidden="true" /> },
{ id: 'mail', label: 'Re: renewal pricing for the mid-market cohort', meta: 'Email', icon: <InboxIcon className="h-3.5 w-3.5" aria-hidden="true" /> }];


/** The candidate shell's top-bar controls, left of the tabs. */
function TopBarControls({ docked, onDock }: {docked: boolean;onDock: () => void;}) {
  return (
    <>
      <div className="flex h-10 shrink-0 items-center gap-0.5 px-2">
        <IconButton label={docked ? 'Hide sidebar' : 'Dock sidebar'} size="sm" icon={<PanelLeftIcon className="h-3.5 w-3.5" />} onClick={onDock} />
        <span className="relative inline-flex">
          <IconButton label="Inbox, 2 unread" size="sm" icon={<InboxIcon className="h-3.5 w-3.5" />} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-1 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-action px-0.5 text-9 font-semibold text-action-fg tnum">
            2
          </span>
        </span>
        <IconButton label="Task brief" size="sm" icon={<BookOpenIcon className="h-3.5 w-3.5" />} />
      </div>
      <div className="flex h-10 shrink-0 items-center px-1">
        <IconButton label="Back" size="sm" icon={<ChevronLeftIcon className="h-3.5 w-3.5" />} />
        <IconButton label="Forward" size="sm" icon={<ChevronRightIcon className="h-3.5 w-3.5" />} disabled />
      </div>
    </>);

}

function SessionDetails() {
  return (
    <>
      <div className="flex items-center gap-2.5 px-3 pb-2.5">
        <Avatar name="Priya Shah" />
        <span className="min-w-0">
          <span className="block truncate text-13 font-medium text-fg-primary">Priya Shah</span>
          <span className="block truncate text-2xs text-fg-muted">priya.shah@example.com</span>
        </span>
      </div>
      <div className="border-t border-line-subtle px-3 pt-2">
        <KeyValueList
          variant="properties"
          size="sm"
          items={[
          { key: 'Assessment', value: 'GTM product marketing' },
          { key: 'Unit', value: '2 of 4, Renewal pricing' },
          {
            key: 'Connection',
            value:
            <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success-solid" />
                  Stable
                </span>

          }]
          } />

      </div>
      <div className="mt-2 border-t border-line-subtle px-1 pt-1">
        <MenuLabel>Shortcuts</MenuLabel>
        <ul className="px-2 text-2xs text-fg-secondary">
          {[
          ['Search your work', '⌘K'],
          ['Rename the open tab', 'F2']].
          map(([what, keys]) =>
          <li key={what} className="flex items-center justify-between py-1">
              <span>{what}</span>
              <kbd className="rounded-xs border border-line bg-surface-subtle px-1 font-sans text-2xs text-fg-muted">{keys}</kbd>
            </li>
          )}
        </ul>
      </div>
    </>);

}

export function CandidateShellPage() {
  const [legacyTab, setLegacyTab] = useState('note');
  const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
  const [tab, setTab] = useState('note');
  const [renaming, setRenaming] = useState<string | null>(null);
  const [created, setCreated] = useState(0);
  const [sidebar, setSidebar] = useState<SidebarMode>('docked');
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [copilotWidth, setCopilotWidth] = useState(200);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = searchRows.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()));

  const closeTab = (id: string) => {
    const at = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (id === tab) setTab(next[Math.min(at, next.length - 1)]?.id ?? '');
  };
  const newTab = () => {
    const id = `page-${created + 1}`;
    setCreated(created + 1);
    setTabs([...tabs, { id, label: 'Untitled', icon: glyph('doc'), renameable: true }]);
    setTab(id);
    setRenaming(id);
  };

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
        intro="Approved with the candidate workspace migration (PRD-08, handoff PLU-123 v1.1, 2026-09-22) and extended after the two workspace reviews of 2026-09-25 and 2026-09-26. The candidate's page is the work surface; everything else is a quiet frame around it. A sidebar that docks, hides, peeks and resizes, browser-style tabs in the top bar, a 32px status bar with a session menu, reference content in a drawer from the left that can pin, search in a lightbox, and the assistant minimising to one floating button." />


      <DocSection
        title="Rules that changed"
        description="Three corrections approved on 2026-09-22, then the rules the workspace reviews changed. Each later rule came from a composition the product had to build because Ledger had no pattern.">

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
        <SpecList
          className="mt-3"
          title="Changed in the workspace reviews, 2026-09-25 and 2026-09-26"
          entries={[
          { term: 'DS-21, tabs close, pin and rename', detail: 'Every tab carries its own close; pinned tabs sit first and cannot close until unpinned; pages the candidate made rename in place. The new-tab control follows the last tab. Supersedes DS-15’s single strip without controls.' },
          { term: 'DS-22, tabs shrink, then scroll', detail: 'Tabs give up width, 224px down to 112px, before the strip scrolls. The strip never shows a scrollbar; fades mark the clipped edges.' },
          { term: 'DS-23, the top bar owns the dock control', detail: 'The sidebar can leave its own control out, drags from 200 to 400px, and stays mounted while hidden.' },
          { term: 'DS-24, sidebar rows say words, not counts', detail: 'Trailing meta is a word ("Unit 1"). "See all" carries no count.' },
          { term: 'DS-25, the status bar keeps what changes', detail: 'What the candidate reads once (the assessment, the connection while it is fine, the shortcuts) moves into the session menu under their name. Segments gain glyphs, dividers and a muted lead word.' },
          { term: 'DS-26, reference opens from the left', detail: 'The brief and the inbox open over the sidebar, beside the navigation that called them, between the top bar and the status bar. Amends DS-16’s right-hand drawer for the candidate shell.' },
          { term: 'DS-30, a page state is a quiet label', detail: '"Read only" is muted text beside a lock, not a Badge. Badges are 3px, never pills.' },
          { term: 'Focus ring in the base layer', detail: 'The global focus ring moved into the base layer and no longer sets a 3px radius, so a component can place it inside its edge. See Accessibility.' }]
          } />

      </DocSection>

      <DocSection
        title="Top bar and browser tabs (DS-15, DS-21, DS-22)"
        description="The open pages sit in the full-width top bar as browser-style tabs. The active tab is white with a three-side border and no bottom border, so it merges into the page below; inactive tabs take the same outline on the sunken strip and share edges with their neighbour. The hairline runs full width and stops under the active tab. Left of the tabs, in this order: the sidebar's dock control, the inbox with its unread count, the brief, then back and forward.">

        <Example label="Top bar with Tabs variant=browser" note="Right-click a tab, double-click the note to rename, F2 on the focused tab" bodyClassName="p-0">
          <header className="flex h-10 items-end bg-surface-sunken shadow-[inset_0_-1px_0_var(--border-default)]">
            <TopBarControls docked onDock={() => undefined} />
            <Tabs
              variant="browser"
              label="Open pages"
              items={tabs}
              value={tab}
              onChange={setTab}
              onClose={closeTab}
              onPinChange={(id, pin) => setTabs(tabs.map((t) => t.id === id ? { ...t, pinned: pin } : t))}
              onRename={(id, name) => setTabs(tabs.map((t) => t.id === id ? { ...t, label: name } : t))}
              renamingId={renaming}
              onRenamingChange={setRenaming}
              onNewTab={newTab} />

          </header>
          <div className="h-20 bg-surface px-4 py-3 text-13 text-fg-muted">Add tabs with the + until the strip overflows.</div>
        </Example>
        <Example label="Overflow at 560px: tabs at their 112px floor, the strip scrolled, both edges faded" className="mt-3" bodyClassName="p-0">
          <div className="max-w-[560px]">
            <Tabs
              variant="browser"
              label="Open pages, overflowing"
              items={[
              ...initialTabs,
              { id: 'q3', label: 'Q3 renewal cohort', icon: glyph('sheet') },
              { id: 'deck', label: 'Board deck notes', icon: glyph('doc') },
              { id: 'pricing', label: 'Pricing history 2023 to 2026', icon: glyph('pdf') },
              { id: 'plan', label: 'Launch plan', icon: glyph('doc') }]
              }
              value="pricing"
              onChange={() => undefined}
              onClose={() => undefined}
              onNewTab={() => undefined} />

          </div>
          <div className="h-10 bg-surface" />
        </Example>
        <Example label="Tabs variant=browser without handlers: the DS-15 strip, unchanged" className="mt-3" bodyClassName="p-0">
          <Tabs variant="browser" label="Open pages, plain" items={legacyTabs} value={legacyTab} onChange={setLegacyTab} />
          <div className="h-10 bg-surface" />
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Close', detail: 'On the active tab, always shown. On an inactive tab it floats over the tab’s end on hover or focus, so the name keeps the room. The last open tab has none. Delete closes the focused tab.' },
          { term: 'Pin', detail: 'Pinned tabs move to the front and show a pin where the close would be; the pin unpins. From the context menu or a caller’s own control.' },
          { term: 'Rename', detail: 'Only pages the candidate made. A click on the active tab’s name, a double-click, F2 or the context menu opens a field in place; Enter keeps, Escape leaves. A new page opens with its name selected.' },
          { term: 'Context menu', detail: 'Right click or Shift+F10: Pin or Unpin, Rename, Close, each only where it applies. A Menu opened at the pointer (see Menus and popovers).' },
          { term: 'Overflow', detail: 'Tabs shrink from 224px to 112px first. Past that the strip scrolls sideways with no scrollbar; the wheel scrolls it, a fade marks each clipped edge, and the active tab is scrolled into view without moving the page.' },
          { term: 'Keyboard', detail: 'One tab stop. Left and Right move and select, Home and End go to the ends, F2 renames, Delete closes.' }]
          } />

        <DoDont
          className="mt-4"
          doText="Keep the strip on the sunken surface and let the active tab's white run into the page. Counts are the only badge a tab carries; a PDF shows its type tag as its glyph."
          dontText="Put an accent underline or an accent fill on the active tab, or push the new-tab control to the far edge where it is lost when three tabs are open." />

      </DocSection>

      <DocSection
        title="Sidebar (DS-14, DS-23, DS-24)"
        description="240px by default, replacing the 48px icon rail for the candidate. Docked it is a column in the flow; its right edge drags from 200 to 400px. Hidden, a 12px hot edge on the left peeks the same panel as a floating overlay on hover or focus; clicking the edge docks it again. The panel stays mounted in every mode. In the candidate shell the top bar owns the dock control, so the sidebar leaves its own out and its header holds the search field.">

        <Example label={`Sidebar, mode ${sidebar}, ${sidebarWidth}px`} note="Drag the edge, or focus it and use the arrows; hover the left edge when hidden" bodyClassName="p-0">
          <div className="flex h-10 items-center bg-surface-sunken shadow-[inset_0_-1px_0_var(--border-default)]">
            <TopBarControls docked={sidebar === 'docked'} onDock={() => setSidebar(sidebar === 'docked' ? 'hidden' : 'docked')} />
          </div>
          <div className="relative flex h-[420px] overflow-hidden bg-canvas">
            <Sidebar
              label="Materials and your work"
              mode={sidebar}
              onModeChange={setSidebar}
              dockControl={false}
              width={sidebarWidth}
              onWidthChange={setSidebarWidth}
              header={
              <button type="button" className="flex h-8 w-full items-center gap-2 rounded-sm border border-line bg-surface px-2.5 text-13 text-fg-muted">
                  <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="flex-1 text-left">Search or ask</span>
                  <kbd className="rounded-xs border border-line bg-surface-subtle px-1 text-2xs">⌘K</kbd>
                </button>
              }
              footer={<Button variant="secondary" size="sm" fullWidth>Submit response</Button>}>

              <SidebarSection label="Materials">
                <SidebarItem label="Task brief" icon={<BookOpenIcon className="h-3.5 w-3.5" />} onSelect={() => undefined} />
                <SidebarItem label="Retention by cohort" icon={<FileGlyph kind="pdf" />} onSelect={() => undefined} />
                <SidebarItem label="Q3 renewal cohort" icon={<Table2Icon className="h-3.5 w-3.5" />} onSelect={() => undefined} />
              </SidebarSection>
              <SidebarSection label="Your work" action={<IconButton label="New page" size="sm" icon={<PlusIcon className="h-3.5 w-3.5" />} />}>
                <SidebarItem label="Repositioning note" icon={<FileTextIcon className="h-3.5 w-3.5" />} active onSelect={() => undefined} onRename={() => undefined} />
                <SidebarItem label="Pricing scratch" icon={<Table2Icon className="h-3.5 w-3.5" />} meta="Unit 1" onSelect={() => undefined} />
              </SidebarSection>
              <SidebarSection label="Chats">
                <SidebarItem label="What churned last year" icon={<MessageSquareIcon className="h-3.5 w-3.5" />} onSelect={() => undefined} />
                <SidebarItem label="Discount history" icon={<MessageSquareIcon className="h-3.5 w-3.5" />} meta="Unit 1" onSelect={() => undefined} />
              </SidebarSection>
              <SidebarSection label="Inbox">
                <SidebarItem label="Re: renewal pricing" icon={<InboxIcon className="h-3.5 w-3.5" />} unread onSelect={() => undefined} />
                <SidebarItem label="Board prep" icon={<InboxIcon className="h-3.5 w-3.5" />} onSelect={() => undefined} />
                <SidebarSeeAll onSelect={() => undefined} />
              </SidebarSection>
            </Sidebar>
            <div className="flex-1 bg-surface p-4 text-13 text-fg-muted">The page is the work surface.</div>
          </div>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Anatomy', detail: '48px header (the search field, or a workspace row with the dock control), one scroll container of sections, a footer outside it for the quiet Submit.' },
          { term: 'Modes', detail: 'docked, hidden, peek. Peek is an overlay with the dialog shadow, inset 12px, and closes when the pointer leaves. Hidden keeps the panel mounted.' },
          { term: 'Width (DS-23)', detail: 'Pass width and onWidthChange: the right edge becomes a PanelSeparator, 200 to 400px. Arrows move it 16px, Home and End go to the ends, Enter hides the sidebar.' },
          { term: 'Rows (DS-24)', detail: 'SidebarSection with an 11px heading and an optional action; SidebarItem at 28px with a 14px glyph, trailing meta in words, a 6px unread dot, double-click to rename; SidebarSeeAll without a count.' },
          { term: 'Accessibility', detail: 'A nav landmark named by the label. The hot edge is a real button, "Show sidebar", so keyboard users can peek and dock it. An unread row says so to screen readers.' }]
          } />

      </DocSection>

      <DocSection
        title="Resizing panels (DS-28)"
        description="PanelSeparator takes the whole resize contract when given onChange: the drag, arrows by 16px, Home and End to the ends, Enter to collapse, and aria-valuenow for the width. resizes says which side grows: the copilot on the right grows as the line moves left.">

        <Example label={`PanelSeparator resizes="next", copilot ${copilotWidth}px`} bodyClassName="p-0">
          <div className="flex h-24 bg-surface">
            <div className="flex-1 p-3 text-13 text-fg-muted">Page</div>
            <PanelSeparator label="Copilot width" value={copilotWidth} min={160} max={320} resizes="next" onChange={setCopilotWidth} />
            <div style={{ width: copilotWidth }} className="shrink-0 bg-surface-subtle p-3 text-13 text-fg-muted">Copilot</div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Page header and its state (DS-30)"
        description="The row above the page: where the open document lives, and on the right its state and actions. A state the candidate cannot act on, such as a material being read only, is said quietly: muted 11px text beside a 12px glyph. It is not a Badge, and never a pill.">

        <Example label="Page header with StateLabel" bodyClassName="p-0">
          <div className="flex h-11 items-center justify-between gap-3 bg-surface px-4">
            <Breadcrumbs items={[{ label: 'Materials' }, { label: 'Retention by cohort' }]} />
            <div className="flex shrink-0 items-center gap-2">
              <StateLabel icon={<LockIcon className="h-3 w-3" aria-hidden="true" />}>Read only</StateLabel>
              <Button variant="secondary" size="sm">Ask about this</Button>
            </div>
          </div>
        </Example>
        <DoDont
          className="mt-4"
          doText={<>A quiet label, right-aligned with the page's actions: <StateLabel icon={<LockIcon className="h-3 w-3" aria-hidden="true" />} className="ml-1">Read only</StateLabel></>}
          dontText={<>A bordered badge beside the title, which reads as a status to act on: <Badge className="ml-1">Read only</Badge>. Where a Badge is right (a list, a table), it is 3px, never a pill.</>} />

      </DocSection>

      <DocSection
        title="Status bar (DS-12, DS-25)"
        description="A 32px bottom bar of mono small-caps segments. Segments use the status type style (10/16 mono caps, tracked) because they are instrumentation. The candidate's name at the far left opens the session details, which hold what is read once: the assessment, the unit, the connection while it is fine, and the shortcuts, with room for settings such as a theme. The bar keeps what changes: the save, the unit, the clock, and the connection only while it is lost. What the timer shows is a product decision; the bar only reserves the seat.">

        <Example label="StatusBar divided, with the session menu" note="Open the name" bodyClassName="p-0">
          <div className="h-72 bg-surface" />
          <StatusBar
            divided
            label="Session status"
            menu={
            <Popover
              label="Session details"
              side="top"
              trigger={({ open, props }) =>
              <StatusBarButton initials="PS" presence="stable" open={open} aria-label="Priya Shah, session details" {...props}>
                    Priya Shah
                  </StatusBarButton>
              }>

                <SessionDetails />
              </Popover>
            }
            segments={[
            { id: 'save', lead: 'Progress', label: 'saved, 12s ago', live: true, glyph: <CheckIcon className="h-3 w-3" aria-hidden="true" /> }]
            }
            trailingSegments={[
            { id: 'unit', lead: 'Unit 2 of 4', label: 'Renewal pricing for the mid-market cohort', shrink: true },
            { id: 'elapsed', lead: 'Elapsed', label: '41:12', glyph: <ClockIcon className="h-3 w-3" aria-hidden="true" /> }]
            } />

        </Example>
        <Example label="StatusBar divided, connection lost" className="mt-3" bodyClassName="p-0">
          <StatusBar
            divided
            menu={<StatusBarButton initials="PS" presence="lost">Priya Shah</StatusBarButton>}
            segments={[
            { id: 'conn', lead: 'Connection', label: 'lost, retrying', tone: 'warning', live: true, glyph: <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warning-solid" /> },
            { id: 'save', lead: 'Progress', label: 'held on this device', live: true, glyph: <CheckIcon className="h-3 w-3" aria-hidden="true" /> }]
            }
            trailingSegments={[{ id: 'elapsed', lead: 'Elapsed', label: '41:12', glyph: <ClockIcon className="h-3 w-3" aria-hidden="true" /> }]} />

        </Example>
        <Example label="StatusBar without the DS-25 options, unchanged" className="mt-3" bodyClassName="p-0">
          <StatusBar
            segments={[
            { id: 'who', label: 'Priya Shah' },
            { id: 'conn', label: 'Connection stable', live: true },
            { id: 'save', label: 'Saved, 12s ago', live: true }]
            }
            trailing="41:12" />

        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Segments (DS-25)', detail: 'lead is the muted word, label the value in the secondary ink; glyph is a 12px mark before them. divided puts a hairline between segments and pads each 12px. shrink marks the value that truncates first (the unit title).' },
          { term: 'Session menu (DS-25)', detail: 'A Popover (a disclosure, role dialog) opening upward, triggered by StatusBarButton: the initials in a 16px circle with the connection as a 6px dot, the name, a chevron. Escape and a click outside close it and return focus.' },
          { term: 'Live regions', detail: 'Save and connection segments are polite live regions. When the connection moves into the menu, announce it from a visually hidden live region so a change is still heard.' }]
          } />

      </DocSection>

      <DocSection
        title="Drawer (DS-16, DS-26)"
        description="Reference content (the brief, the inbox) opens over the page as a 480px drawer and can pin, becoming a 400px column in the flow where the caller places it. In the candidate shell it opens from the left, over the sidebar, and stops at the top bar and the status bar so the tabs and the session state stay in view. Pinning it there makes it a pinned tab, which is the product's composition.">

        <Example label="Drawer, floating then pinned">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => {setPinned(false);setDrawerOpen(true);}}>Open as drawer</Button>
            <Button size="sm" variant="tertiary" onClick={() => {setPinned(true);setDrawerOpen(true);}}>Open pinned</Button>
            <Button size="sm" variant="secondary" onClick={() => setLeftDrawer(true)}>Open from the left, below the header</Button>
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
          <Drawer
            open={leftDrawer}
            side="left"
            inset={{ top: 48 }}
            onClose={() => setLeftDrawer(false)}
            eyebrow="Inbox"
            title="Renewal pricing for the mid-market cohort">

            {reader}
          </Drawer>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Widths', detail: '480px floating (max 90% of the viewport), 400px pinned. The pinned column takes a hairline on the page side and no shadow.' },
          { term: 'Side and inset (DS-26)', detail: 'side="left" opens from the left edge with the hairline on its right. inset={{ top: 40, bottom: 32 }} keeps the candidate shell’s top bar and status bar outside the scrim.' },
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
        description="One message opened from the inbox: subject, sender meta with the source as a micro label, body at reading measure, attachment chips, then the reply seat. Slack senders take the square avatar so the source is legible without the label; people are otherwise always circles. The inbox list itself is on Workspace content.">

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
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Daniel Okafor" /> circle, people</span>
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Neha Raman" shape="square" /> square, Slack authorship only</span>
              <span className="flex items-center gap-2 text-13 text-fg-secondary"><Avatar name="Priya Shah" size="xs" /> xs, initials in the badge style</span>
            </div>
          </Example>
          <Example label="A file name shown without its extension (DS-29)" tone="surface">
            <span className="flex items-center gap-2 text-13 text-fg-secondary">
              <FileGlyph name="Retention by cohort.pdf" className="text-fg-muted" />
              <FileName name="Retention by cohort.pdf" />
            </span>
          </Example>
        </div>
      </DocSection>

      <DocSection
        title="Minimised assistant (DS-13)"
        description="The assistant column does not collapse to a labelled edge tab. It minimises to a 40px floating button at the bottom right of the work surface, with the unread count as one of the shell's three accent uses. The count sits on the action surface with its near-black ink, which passes 4.5:1 where white on orange did not. CollapsedEdgeTab stays the rule for panels whose label must remain visible.">

        <Example label="MinimisedPanelButton with 2 unread">
          <div className="relative h-32 border border-line bg-surface">
            <MinimisedPanelButton label="Open copilot" icon={<MessageSquareIcon className="h-4 w-4" aria-hidden="true" />} count={2} onExpand={() => undefined} />
          </div>
        </Example>
      </DocSection>
    </>);

}
