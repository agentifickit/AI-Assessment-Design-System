import { useState } from 'react';
import {
  ChevronDownIcon,
  CopyIcon,
  FileTextIcon,
  GlobeIcon,
  PencilIcon,
  PinIcon,
  SquarePenIcon,
  Table2Icon,
  Trash2Icon } from
'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from '../../components/ui/Menu';
import { Popover } from '../../components/ui/Popover';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBar, StatusBarButton } from '../../components/layout/StatusBar';

const models = ['Balanced', 'Fast', 'Thorough'];

const quietTrigger =
'inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-sm px-2 text-2xs font-medium text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary';

export function MenusPage() {
  const [newOpen, setNewOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState('Balanced');
  const [context, setContext] = useState<{x: number;y: number;} | null>(null);
  const [last, setLast] = useState('Nothing chosen yet');

  const choose = (what: string, close: () => void) => {
    close();
    setLast(what);
  };

  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Menus and popovers"
        intro="Ledger had no menu. The candidate workspace composed four: the copilot's mode, model and chat switchers, the new-page menu, the tab context menu, and the session details under the candidate's name. These are the primitives it needed. A Menu is a list of commands; a Popover is a disclosure that reads a few facts out. Both float on the popover elevation, are non-modal, and close on Escape or a click outside. DS-35, from the workspace review of 2026-09-26." />


      <DocSection
        title="Menu button"
        description="A trigger that opens a list of commands under it, or above it when the trigger sits at the foot of the screen. The first item takes focus; arrows, Home and End move; Enter chooses; Escape and Tab close. Each item closes the menu itself, so a command that opens something else can decide where focus goes.">

        <Example label="Menu with icons, and a switcher with the current choice checked" note={last}>
          <div className="flex flex-wrap items-start gap-6">
            <Menu
              label="New page"
              open={newOpen}
              onOpenChange={setNewOpen}
              panelClassName="w-52"
              trigger={({ props }) =>
              <button
                type="button"
                aria-label="New doc, sheet or browser session"
                title="New doc, sheet or browser session"
                {...props}
                className="inline-flex h-6 items-center gap-0.5 rounded-xs px-1 text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">

                  <SquarePenIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronDownIcon className="h-2.5 w-2.5" aria-hidden="true" />
                </button>
              }>

              <MenuItem icon={<FileTextIcon className="h-3.5 w-3.5" />} onSelect={() => choose('New doc', () => setNewOpen(false))}>New doc</MenuItem>
              <MenuItem icon={<Table2Icon className="h-3.5 w-3.5" />} onSelect={() => choose('New sheet', () => setNewOpen(false))}>New sheet</MenuItem>
              <MenuItem icon={<GlobeIcon className="h-3.5 w-3.5" />} onSelect={() => choose('New browser session', () => setNewOpen(false))}>
                New browser session
              </MenuItem>
            </Menu>

            <Menu
              label="Model"
              open={modelOpen}
              onOpenChange={setModelOpen}
              trigger={({ props }) =>
              <button type="button" {...props} className={quietTrigger}>
                  {model}
                  <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              }>

              <MenuLabel>Model</MenuLabel>
              {models.map((m) =>
              <MenuItem key={m} selected={m === model} onSelect={() => {setModel(m);setModelOpen(false);}}>
                  {m}
                </MenuItem>
              )}
              <MenuSeparator />
              <MenuItem trailing="⌘," onSelect={() => choose('Model settings', () => setModelOpen(false))}>Model settings</MenuItem>
            </Menu>
          </div>
          <div className="h-52" />
        </Example>
      </DocSection>

      <DocSection
        title="Context menu"
        description="The same Menu opened at a point, for a right click or Shift+F10. It is fixed to the viewport and nudged back inside it near an edge. It closes on Escape, a click outside, or a resize; focus returns to where it was.">

        <Example label="Menu at the pointer" note="Right-click the area">
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              const r = e.currentTarget.getBoundingClientRect();
              const fromKeys = e.clientX === 0 && e.clientY === 0;
              setContext({ x: fromKeys ? r.left : e.clientX, y: fromKeys ? r.top : e.clientY });
            }}
            tabIndex={0}
            className="flex h-32 items-center justify-center rounded-md border border-dashed border-line-strong bg-surface text-13 text-fg-muted">

            Right-click here
          </div>
          {context &&
          <Menu open at={context} onOpenChange={(open) => !open && setContext(null)} label="Page" panelClassName="w-44">
              <MenuItem icon={<PinIcon className="h-3.5 w-3.5" />} onSelect={() => choose('Pin tab', () => setContext(null))}>Pin tab</MenuItem>
              <MenuItem icon={<PencilIcon className="h-3.5 w-3.5" />} onSelect={() => choose('Rename', () => setContext(null))}>Rename</MenuItem>
              <MenuItem icon={<CopyIcon className="h-3.5 w-3.5" />} onSelect={() => choose('Duplicate', () => setContext(null))}>Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem destructive icon={<Trash2Icon className="h-3.5 w-3.5" />} onSelect={() => choose('Delete', () => setContext(null))}>Delete</MenuItem>
            </Menu>
          }
        </Example>
      </DocSection>

      <DocSection
        title="Disclosure popover: session details"
        description="A Popover reads something out rather than offering commands: the session details under the candidate's name in the status bar. Who is signed in, a property list of what the session is (assessment, unit, connection), then the shortcuts. Settings, such as a colour theme, join it under their own label as rows of a label and a control, never as a second menu.">

        <Example label="Popover role=dialog, opening upward from the status bar" bodyClassName="p-0">
          <div className="h-72 bg-surface" />
          <StatusBar
            divided
            menu={
            <Popover
              label="Session details"
              side="top"
              trigger={({ open, props }) =>
              <StatusBarButton initials="PS" presence="stable" open={open} aria-label="Priya Shah, session details" {...props}>
                    Priya Shah
                  </StatusBarButton>
              }>

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
              </Popover>
            }
            segments={[{ id: 'save', lead: 'Progress', label: 'saved, 12s ago' }]} />

        </Example>
      </DocSection>

      <DocSection title="Specification">
        <SpecList
          entries={[
          { term: 'Surface', detail: 'surface-raised, a 1px line border, the popover shadow, --radius-lg 8px as the radius scale sets for popovers and menus. Menus pad 4px and are 224px wide by default; disclosures are 288px.' },
          { term: 'Items', detail: '13px, 6px by 8px padding, a 14px muted icon, a 3px radius. Hover and keyboard focus take the hover surface; focus also keeps the ring, drawn inside the item. The current choice in a switcher takes the active surface and a check, so the fill is never the only cue.' },
          { term: 'Roles', detail: 'Menu: role menu with menuitem, or menuitemradio with aria-checked for a switcher. Popover: role dialog, non-modal, named by its label. The trigger gets aria-haspopup, aria-expanded and aria-controls from the render prop.' },
          { term: 'Focus', detail: 'In on open (the first item, or the disclosure itself), back to the trigger on Escape or a choice. A click elsewhere leaves focus where it lands.' },
          { term: 'Placement', detail: 'side top or bottom, align start or end. A menu at the foot of the screen opens upward so it never makes the shell taller than the window.' },
          { term: 'Accent', detail: 'None. A destructive item takes the danger ink. The selected row is neutral.' }]
          } />

        <DoDont
          className="mt-4"
          doText="Use a Popover for facts that are read once and a Menu for commands. Put settings inside the disclosure that already exists."
          dontText="Open a menu from a menu, or use a Dialog for a handful of facts; a modal takes the whole screen for something a glance can answer." />

      </DocSection>
    </>);

}
