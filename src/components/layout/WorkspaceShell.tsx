import React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../ui/IconButton';
import { Tabs } from '../ui/Tabs';
import { PanelSeparator } from './PanelSeparator';
import { CollapsedEdgeTab } from './CollapsedEdgeTab';
import { panelConstraints, usePanelLayout, type PanelId, type UsePanelLayoutResult } from '../../hooks/usePanelLayout';

export interface WorkspaceShellProps {
  /** Sticky above all panels. Carries task name, timer, save and connection
   *  status, and submit — a candidate must never scroll to find their time. */
  header: React.ReactNode;
  brief: React.ReactNode;
  conversation: React.ReactNode;
  artifact: React.ReactNode;
  rail?: React.ReactNode;
  /** Exposed so a page can label the region and react to the mode. */
  onLayout?: (layout: UsePanelLayoutResult) => void;
  className?: string;
}

const tabItems: {id: PanelId;label: string;}[] = [
{ id: 'brief', label: 'Brief' },
{ id: 'conversation', label: 'Chat' },
{ id: 'artifact', label: 'Draft' }];


/** The three-panel assessment workspace.
 *
 *  Two rules govern this component:
 *  1. Overflow ownership — the shell itself never scrolls. Each panel owns
 *     exactly one scroll container and no scroll container nests inside
 *     another. Every flex ancestor carries min-h-0 so that holds.
 *  2. No remounting — the same three children render in every mode. A
 *     candidate resizing the window or rotating a tablet must never lose
 *     draft text, scroll position, or conversation state. */
export function WorkspaceShell({
  header,
  brief,
  conversation,
  artifact,
  rail,
  onLayout,
  className
}: WorkspaceShellProps) {
  const layout = usePanelLayout();
  const {
    containerRef,
    mode,
    isThreePanel,
    briefIsSheet,
    isTabbed,
    panels,
    activeTab,
    setActiveTab,
    briefSheetOpen,
    setBriefSheetOpen,
    resize,
    toggleCollapse,
    separatorKeyDown
  } = layout;

  React.useEffect(() => {
    onLayout?.(layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, panels.brief.width, panels.artifact.width, panels.brief.collapsed, panels.artifact.collapsed]);

  const showBriefColumn = isThreePanel && !panels.brief.collapsed;
  const showArtifactColumn = !isTabbed && !panels.artifact.collapsed;

  return (
    <div
      ref={containerRef}
      data-layout-mode={mode}
      className={cn('relative flex min-h-0 w-full flex-col overflow-hidden bg-canvas', className)}>
      
      {/* Sticky task header — outside every scroll container by construction. */}
      <div className="shrink-0 border-b border-line bg-surface">{header}</div>

      {isTabbed &&
      <div className="shrink-0 border-b border-line bg-surface px-3 py-2">
          <Tabs
          label="Workspace panel"
          variant="segmented"
          value={activeTab}
          onChange={(v) => setActiveTab(v as PanelId)}
          items={tabItems} />
        
        </div>
      }

      <div className="flex min-h-0 flex-1 gap-1.5 p-1.5">
        {rail && <div className="shrink-0">{rail}</div>}

        {/* ── Columned modes ─────────────────────────────────────────── */}
        {!isTabbed &&
        <>
            {showBriefColumn ?
          <>
                <div style={{ width: panels.brief.width }} className="flex min-h-0 shrink-0">
                  {brief}
                </div>
                <PanelSeparator
              label="Task brief width"
              value={panels.brief.width}
              min={panelConstraints.brief.min}
              max={panelConstraints.brief.max}
              onKeyDown={separatorKeyDown('brief', 'right')}
              onDrag={(d) => resize('brief', d)} />
            
              </> :

          isThreePanel &&
          <CollapsedEdgeTab label="Task brief" side="left" onExpand={() => toggleCollapse('brief')} />

          }

            {/* The conversation is the flex child — it absorbs the remainder. */}
            <div className="flex min-h-0 min-w-0 flex-1">{conversation}</div>

            {showArtifactColumn ?
          <>
                <PanelSeparator
              label="Draft width"
              value={panels.artifact.width}
              min={panelConstraints.artifact.min}
              max={panelConstraints.artifact.max}
              onKeyDown={separatorKeyDown('artifact', 'left')}
              onDrag={(d) => resize('artifact', -d)} />
            
                <div style={{ width: panels.artifact.width }} className="flex min-h-0 shrink-0">
                  {artifact}
                </div>
              </> :

          <CollapsedEdgeTab label="Draft" side="right" onExpand={() => toggleCollapse('artifact')} />
          }
          </>
        }

        {/* ── Tabbed modes — same children, one visible at a time ────── */}
        {isTabbed &&
        <>
            <div className={cn('min-h-0 min-w-0 flex-1', activeTab !== 'brief' && 'hidden')}>{brief}</div>
            <div className={cn('min-h-0 min-w-0 flex-1', activeTab !== 'conversation' && 'hidden')}>
              {conversation}
            </div>
            <div className={cn('min-h-0 min-w-0 flex-1', activeTab !== 'artifact' && 'hidden')}>{artifact}</div>
          </>
        }
      </div>

      {/* Brief as an overlay sheet at brief-collapses. Rendered in place rather
           than portalled so the panel's own state survives the mode change. */}
      {briefIsSheet &&
      <>
          {!briefSheetOpen &&
        <button
          type="button"
          onClick={() => setBriefSheetOpen(true)}
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-md border border-l-0 border-line bg-surface px-1.5 py-3 text-2xs font-semibold uppercase tracking-wide text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover"
          style={{ writingMode: 'vertical-rl' }}>
          
              Task brief
            </button>
        }
          {briefSheetOpen &&
        <div className="absolute inset-0 z-30 flex">
              <div
            className="absolute inset-0"
            style={{ background: 'var(--overlay-scrim)' }}
            aria-hidden="true"
            onClick={() => setBriefSheetOpen(false)} />
          
              <div className="relative flex w-[380px] max-w-[85%] min-h-0 flex-col bg-surface shadow-dialog">
                <div className="flex shrink-0 items-center justify-between border-b border-line px-3 py-2">
                  <span className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">Task brief</span>
                  <IconButton
                label="Close task brief"
                size="sm"
                icon={<XIcon className="h-3.5 w-3.5" />}
                onClick={() => setBriefSheetOpen(false)} />
              
                </div>
                <div className="min-h-0 flex-1">{brief}</div>
              </div>
            </div>
        }
        </>
      }
    </div>);

}