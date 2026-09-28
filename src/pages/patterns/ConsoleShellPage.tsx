import React, { useState } from 'react';
import {
  BriefcaseIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  EllipsisIcon,
  PanelLeftIcon,
  UploadIcon,
  UserPlusIcon,
  UsersIcon } from
'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { ButtonGroup } from '../../components/ui/ButtonGroup';
import { EmptyState } from '../../components/ui/EmptyState';
import { SaveStatus } from '../../components/assessment/SaveStatus';
import { cn } from '../../utils/cn';

const nav = [
{ id: 'assessments', label: 'Assessments', Icon: ClipboardCheckIcon },
{ id: 'candidates', label: 'Candidates', Icon: UsersIcon },
{ id: 'roles', label: 'Roles', Icon: BriefcaseIcon }];


/** The workspace's mark: its initial on brand-subtle, 24px, rounded. */
function WorkspaceMark({ name }: {name: string;}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-brand-subtle text-2xs font-semibold text-brand-fg">

      {name[0]}
    </span>);

}

function ConsoleSidebar({ collapsed, onToggle }: {collapsed: boolean;onToggle: () => void;}) {
  const [current, setCurrent] = useState('assessments');
  return (
    <aside
      aria-label="Console"
      className={cn(
        'flex shrink-0 flex-col border-r border-line bg-surface-subtle transition-[width] duration-180 ease-move',
        collapsed ? 'w-16' : 'w-60'
      )}>

      <div className={cn('flex h-12 items-center gap-1 px-3', collapsed && 'justify-center px-0')}>
        {!collapsed &&
        <button
          type="button"
          aria-haspopup="menu"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-sm px-1.5 py-1 text-left transition-colors duration-100 ease-enter hover:bg-surface-hover">

            <WorkspaceMark name="Acme Corp" />
            <span className="truncate text-13 font-semibold text-fg-primary">Acme Corp</span>
            <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
          </button>
        }
        <IconButton
          label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          icon={<PanelLeftIcon className="h-4 w-4" />}
          onClick={onToggle} />

      </div>

      <nav aria-label="Console sections" className={cn('flex flex-col gap-0.5 px-3 pt-2', collapsed && 'items-center px-0')}>
        {nav.map(({ id, label, Icon }) => {
          const active = id === current;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active ? 'page' : undefined}
              aria-label={collapsed ? label : undefined}
              title={collapsed ? label : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrent(id);
              }}
              className={cn(
                'flex h-8 items-center gap-2.5 rounded-sm text-13 font-medium transition-colors duration-100 ease-enter',
                collapsed ? 'w-8 justify-center' : 'px-2.5',
                active ? 'bg-surface-active text-fg-primary' : 'text-fg-secondary hover:bg-surface-hover hover:text-fg-primary'
              )}>

              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span className="truncate">{label}</span>}
            </a>);

        })}
      </nav>

      <div className={cn('mt-auto flex items-center gap-2.5 border-t border-line px-3 py-3', collapsed && 'flex-col px-0')}>
        <Avatar name="Sarah Chen" size="md" />
        {!collapsed &&
        <span className="min-w-0 flex-1">
            <span className="block truncate text-13 font-medium text-fg-primary">Sarah Chen</span>
            <span className="block truncate text-2xs text-fg-muted">Owner, Acme Corp</span>
          </span>
        }
        <IconButton label="Account menu for Sarah Chen" aria-haspopup="menu" icon={<EllipsisIcon className="h-4 w-4" />} />
      </div>
    </aside>);

}

function ConsoleTopBar({ saving }: {saving: boolean;}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface px-4">
      <Breadcrumbs separator="slash" items={[{ label: 'Assessments', href: '#assessments' }, { label: 'Product Marketing, Senior' }]} />
      <Badge tone="success" dot>
        Published
      </Badge>
      {saving && <SaveStatus state="saved" />}
      <div className="ml-auto flex items-center gap-2">
        <Button variant="primary">Invite candidates</Button>
      </div>
    </header>);

}

export function ConsoleShellPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState('candidates');
  const [filter, setFilter] = useState('all');

  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Console shell"
        intro="The recruiter console's chrome: a 48px breadcrumb row across the top and a sidebar that leads with the workspace. Every admin page sits inside it and never draws its own bar or sidebar. Approved with the assessment-creation wizard (PLU-092 v1.11, D-34 and D-35) and followed by every console handoff since. Issue #2, rules 3 and 4." />


      <DocSection
        title="The shell"
        description="The sidebar collapses to a 64px rail of icons; every control keeps its accessible name. The page's heading lives in the content, never in the bar. The example is the first-run Candidates tab of a published assessment (PLU-097 frame 01).">

        <Example label="Console shell, first run" note="Toggle the rail with the panel control" bodyClassName="p-0">
          <div className="flex h-[520px] overflow-hidden bg-canvas">
            <ConsoleSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
            <div className="flex min-w-0 flex-1 flex-col">
              <ConsoleTopBar saving={false} />
              <main className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
                <h1 className="text-2xl font-semibold text-fg-primary">Product Marketing, Senior</h1>
                <p className="mt-1 text-13 text-fg-muted">A compliance product launch at LedgerLoop. 50 minutes. Published on 24 Sep.</p>
                <Tabs
                  className="mt-5"
                  label="Assessment sections"
                  value={tab}
                  onChange={setTab}
                  items={[
                  { id: 'candidates', label: 'Candidates', count: 0 },
                  { id: 'details', label: 'Assessment details' }]
                  } />

                <EmptyState
                  className="mt-5 border-solid bg-surface py-16"
                  kind="first-run"
                  icon={<UsersIcon className="h-5 w-5" />}
                  title="No candidates invited yet"
                  description="Upload a CSV of up to 200 candidates, or add them one at a time. Each candidate gets their own link to this assessment, and you send it from your own email."
                  action={
                  <>
                      <Button size="sm" iconLeft={<UploadIcon className="h-3.5 w-3.5" aria-hidden="true" />}>
                        Upload a CSV
                      </Button>
                      <Button size="sm" iconLeft={<UserPlusIcon className="h-3.5 w-3.5" aria-hidden="true" />}>
                        Add one candidate
                      </Button>
                    </>
                  } />

              </main>
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Top bar: a 48px breadcrumb row"
        description="From the left: the parent as a link, a slash, the page as the current crumb, an optional status Badge, and an optional transient SaveStatus. At the right, the page's one or two 32px actions, the primary last. A page without a parent shows its title as the only crumb.">

        <div className="grid gap-3">
          <Example label="Breadcrumb row with a status and the page's action" bodyClassName="p-0">
            <ConsoleTopBar saving={false} />
          </Example>
          <Example label="While a change saves" note="SaveStatus shows, then clears a few seconds after saving" bodyClassName="p-0">
            <ConsoleTopBar saving />
          </Example>
        </div>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Height', detail: '48px, surface, a border-default hairline below. No shadow.' },
          { term: 'Crumbs', detail: 'Breadcrumbs with separator="slash". The current crumb carries aria-current="page".' },
          { term: 'Status', detail: 'A Badge with its word (Draft, Published), never a colour alone.' },
          { term: 'SaveStatus', detail: 'A status line, never a toast. Saved shows for a few seconds after each change and clears; saving, retrying and queued stay until they resolve.' },
          { term: 'Actions', detail: 'One or two Buttons at md (32px). At most one primary, and it is the page’s primary: an empty state below never repeats it.' },
          { term: 'Title', detail: 'None in the bar. The page’s heading is heading-1 in the content.' }]
          } />

        <DoDont
          className="mt-4"
          doText="Name where the reader is with the crumbs, and give the page its heading in the content, where the tabs and the body start."
          dontText="Put the page title in the bar as well as in the content, or add a second primary action beside the first." />

      </DocSection>

      <DocSection
        title="Sidebar: the workspace leads"
        description="Top to bottom: the workspace switcher (its mark, the organization's name, a chevron) with the collapse control beside it; the navigation, one Lucide icon per section; and the user menu pinned to the bottom (avatar, name, role and organization, a menu with Sign out). The product logo does not appear here: the product is not the workspace.">

        <div className="grid gap-3 sm:grid-cols-[auto_auto_1fr]">
          <Example label="Expanded, 240px" bodyClassName="p-0">
            <div className="flex h-[360px]">
              <ConsoleSidebar collapsed={false} onToggle={() => undefined} />
            </div>
          </Example>
          <Example label="Rail, 64px" bodyClassName="p-0">
            <div className="flex h-[360px]">
              <ConsoleSidebar collapsed onToggle={() => undefined} />
            </div>
          </Example>
          <SpecList
            columns={1}
            entries={[
            { term: 'Switcher', detail: 'A 24px mark with the workspace initial on brand-subtle, the name in 13px semibold, a chevron. Its menu holds Settings, Invite and Sign out.' },
            { term: 'Collapse', detail: 'An IconButton with the panel-left glyph and aria-expanded. The choice persists per browser and survives navigation. Below 900px the rail is forced and the control is hidden.' },
            { term: 'Navigation', detail: '32px rows, a 16px icon and the label in 13px medium. The current page is fg-primary on the pressed fill, with aria-current="page". In the rail each link keeps its name as aria-label and title.' },
            { term: 'User', detail: 'Pinned to the bottom above a hairline: avatar, name, role and organization, and a menu with Sign out. Sign out is never a loose link.' }]
            } />

        </div>
      </DocSection>

      <DocSection
        title="Filters and tabs with counts"
        description="A count sits beside its label as a plain figure in the label's weight and the muted ink, never in a chip. Leave it off while it loads rather than showing zero. On a selected ButtonGroup segment the count steps up to the secondary ink, because muted on the pressed fill is 4.12:1. PLU-097 DS-25, issue #18.">

        <Example label="Tabs line and ButtonGroup, each with counts" tone="surface">
          <div className="flex flex-col items-start gap-4">
            <Tabs
              className="self-stretch"
              label="Assessment sections"
              value="candidates"
              onChange={() => undefined}
              items={[
              { id: 'candidates', label: 'Candidates', count: 20 },
              { id: 'details', label: 'Assessment details' }]
              } />

            <ButtonGroup
              label="Filter candidates by status"
              value={filter}
              onChange={setFilter}
              options={[
              { value: 'all', label: 'All', count: 20 },
              { value: 'invited', label: 'Invited', count: 6 },
              { value: 'progress', label: 'In progress', count: 4 },
              { value: 'completed', label: 'Completed', count: 7 },
              { value: 'closed', label: 'Cancelled or expired', count: 3 }]
              } />

          </div>
        </Example>
      </DocSection>

      <DocSection
        title="First run with two ways in"
        description="When the product names two ways to begin, the empty state carries both as sm secondary buttons; the page's primary stays in the top bar. A first-run state is the whole content of its page, so its title is heading-3 (16px). On a page the state sits on the surface with a solid hairline, as the example above does; the dashed default marks an empty region inside a panel. PLU-097 DS-21, issue #18.">

        <DoDont
          doText="Two secondary buttons that each start one route, named for what they do: Upload a CSV, Add one candidate."
          dontText="A primary button in the empty state that repeats the top bar's action, or a third route. More than two ways in belongs in the dialog the primary opens." />

      </DocSection>
    </>);

}
