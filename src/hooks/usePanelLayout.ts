import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Layout modes are named for the content failure they prevent, not for a
 *  device class. The threshold is the width at which the previous arrangement
 *  can no longer hold the conversation above its readable floor. */
export type LayoutMode =
'comfortable-three' |
'tight-three' |
'brief-collapses' |
'tabbed-pair' |
'single-column';

export const layoutThresholds: {mode: LayoutMode;min: number;why: string;}[] = [
{
  mode: 'comfortable-three',
  min: 1600,
  why: 'All three panels sit above their minimum and the conversation clears a comfortable 68ch measure.'
},
{
  mode: 'tight-three',
  min: 1280,
  why: 'Three panels still fit, but the outer two are pinned to their minimums and the conversation sits at its 520px floor.'
},
{
  mode: 'brief-collapses',
  min: 1024,
  why: 'Three panels can no longer clear the conversation floor, so the task brief becomes an overlay sheet.'
},
{
  mode: 'tabbed-pair',
  min: 768,
  why: 'Two panels side by side would both fall below their minimums, so panels become tabs with a fixed composer.'
},
{
  mode: 'single-column',
  min: 0,
  why: 'One column with the same three tabs; timer and save status move to a compact sticky bar.'
}];


export function modeForWidth(width: number): LayoutMode {
  return layoutThresholds.find((t) => width >= t.min)?.mode ?? 'single-column';
}

export type PanelId = 'brief' | 'conversation' | 'artifact';

export interface PanelConstraint {
  min: number;
  max: number;
  initial: number;
}

/** The conversation is deliberately absent — it is never a fixed width. It
 *  absorbs whatever the outer two panels leave, and its 520px floor is what
 *  forces a mode change rather than a compression. */
export const panelConstraints: Record<'brief' | 'artifact', PanelConstraint> = {
  brief: { min: 280, max: 420, initial: 320 },
  artifact: { min: 360, max: 720, initial: 400 }
};

/** Below this the conversation stops being readable: a 68ch measure plus the
 *  user-message inset and the action row no longer coexist. */
export const CONVERSATION_FLOOR = 520;

export const RESIZE_STEP = 16;

export interface PanelState {
  width: number;
  collapsed: boolean;
  /** Restored on expand, so re-opening never snaps back to the default. */
  lastWidth: number;
}

export interface UsePanelLayoutResult {
  containerRef: React.RefObject<HTMLDivElement>;
  containerWidth: number;
  mode: LayoutMode;
  /** True when all three panels are laid out side by side. */
  isThreePanel: boolean;
  /** True when the brief is only reachable as an overlay sheet. */
  briefIsSheet: boolean;
  /** True when panels are presented as tabs rather than columns. */
  isTabbed: boolean;
  panels: Record<'brief' | 'artifact', PanelState>;
  activeTab: PanelId;
  setActiveTab: (id: PanelId) => void;
  briefSheetOpen: boolean;
  setBriefSheetOpen: (open: boolean) => void;
  resize: (id: 'brief' | 'artifact', deltaPx: number) => void;
  setWidth: (id: 'brief' | 'artifact', width: number) => void;
  toggleCollapse: (id: 'brief' | 'artifact') => void;
  /** Keyboard contract for a separator: arrows nudge, Home/End jump, Enter collapses. */
  separatorKeyDown: (id: 'brief' | 'artifact', edge: 'left' | 'right') => (e: React.KeyboardEvent) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function usePanelLayout(): UsePanelLayoutResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1600);
  const [activeTab, setActiveTab] = useState<PanelId>('conversation');
  const [briefSheetOpen, setBriefSheetOpen] = useState(false);

  const [panels, setPanels] = useState<Record<'brief' | 'artifact', PanelState>>({
    brief: { width: panelConstraints.brief.initial, collapsed: false, lastWidth: panelConstraints.brief.initial },
    artifact: {
      width: panelConstraints.artifact.initial,
      collapsed: false,
      lastWidth: panelConstraints.artifact.initial
    }
  });

  // Container-driven rather than viewport-driven, so the workspace behaves the
  // same whether it is full-bleed or embedded inside the documentation shell.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const mode = useMemo(() => modeForWidth(containerWidth), [containerWidth]);
  const isThreePanel = mode === 'comfortable-three' || mode === 'tight-three';
  const briefIsSheet = mode === 'brief-collapses';
  const isTabbed = mode === 'tabbed-pair' || mode === 'single-column';

  const setWidth = useCallback((id: 'brief' | 'artifact', width: number) => {
    const c = panelConstraints[id];
    setPanels((prev) => ({
      ...prev,
      [id]: { ...prev[id], collapsed: false, width: clamp(width, c.min, c.max), lastWidth: clamp(width, c.min, c.max) }
    }));
  }, []);

  const resize = useCallback((id: 'brief' | 'artifact', deltaPx: number) => {
    const c = panelConstraints[id];
    setPanels((prev) => {
      const next = clamp(prev[id].width + deltaPx, c.min, c.max);
      return { ...prev, [id]: { ...prev[id], collapsed: false, width: next, lastWidth: next } };
    });
  }, []);

  const toggleCollapse = useCallback((id: 'brief' | 'artifact') => {
    setPanels((prev) => {
      const p = prev[id];
      return {
        ...prev,
        [id]: p.collapsed ?
        { ...p, collapsed: false, width: p.lastWidth } :
        { ...p, collapsed: true, lastWidth: p.width }
      };
    });
  }, []);

  const separatorKeyDown = useCallback(
    (id: 'brief' | 'artifact', edge: 'left' | 'right') => (e: React.KeyboardEvent) => {
      // A separator on the right edge of a panel grows it when pushed right;
      // one on the left edge grows it when pushed left.
      const sign = edge === 'right' ? 1 : -1;
      const c = panelConstraints[id];
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          resize(id, RESIZE_STEP * sign);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          resize(id, -RESIZE_STEP * sign);
          break;
        case 'Home':
          e.preventDefault();
          setWidth(id, c.min);
          break;
        case 'End':
          e.preventDefault();
          setWidth(id, c.max);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleCollapse(id);
          break;
        default:
          break;
      }
    },
    [resize, setWidth, toggleCollapse]
  );

  return {
    containerRef,
    containerWidth,
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
    setWidth,
    toggleCollapse,
    separatorKeyDown
  };
}