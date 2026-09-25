import type { TokenRow } from '../types/system';

export const primitiveNeutral: TokenRow[] = [
{ name: '--neutral-00', value: '#ffffff', usage: 'Pure surface. Light-mode cards and panels.' },
{ name: '--neutral-25', value: '#fcfcfb', usage: 'Barely-there tint. Print and export backgrounds.' },
{ name: '--neutral-50', value: '#fafaf8', usage: 'Light-mode application canvas.' },
{ name: '--neutral-100', value: '#f4f4f1', usage: 'Subtle and sunken surfaces, table headers.' },
{ name: '--neutral-200', value: '#eaeae6', usage: 'Hairline dividers inside a surface.' },
{ name: '--neutral-300', value: '#dcdcd7', usage: 'Default border. Inputs, cards, panels.' },
{ name: '--neutral-400', value: '#bfbfb8', usage: 'Strong border, disabled foreground.' },
{ name: '--neutral-500', value: '#97968e', usage: 'Non-text UI marks only. 2.6:1 on white.' },
{ name: '--neutral-600', value: '#71706a', usage: 'Muted text. 4.6:1 on white.' },
{ name: '--neutral-700', value: '#56554f', usage: 'Secondary text. 7.4:1 on white.' },
{ name: '--neutral-800', value: '#3a3934', usage: 'High-emphasis marks, human-provenance rules.' },
{ name: '--neutral-900', value: '#232220', usage: 'Primary text. 14.8:1 on white.' },
{ name: '--neutral-950', value: '#141312', usage: 'Scrim base, dark-mode reference black.' }];


export const primitiveOrange: TokenRow[] = [
{ name: '--orange-50', value: '#fef1ec', usage: 'Selected row, accent callout background.' },
{ name: '--orange-100', value: '#fde3d8', usage: 'Selection highlight, low-emphasis accent fill.' },
{ name: '--orange-200', value: '#fbb396', usage: 'Chart accent, disabled accent surface.' },
{ name: '--orange-300', value: '#f97b4a', usage: 'Dark-mode hover accent.' },
{ name: '--orange-400', value: '#fa7440', usage: 'Dark-mode accent solid and focus ring.' },
{ name: '--orange-500', value: '#f6521f', usage: 'Light-mode accent solid and focus ring.', note: '3.4:1 on white — background only, never accent text.' },
{ name: '--orange-600', value: '#c2400f', usage: 'Primary button hover.' },
{ name: '--orange-700', value: '#9a330c', usage: 'Accent text and accent icons. 6.9:1 on white.' },
{ name: '--orange-800', value: '#7a2a0c', usage: 'Pressed accent, accent text on tinted surfaces.' },
{ name: '--orange-900', value: '#4e1b07', usage: 'Deepest accent. Print and high-contrast fallback.' }];


export const semanticSurface: TokenRow[] = [
{ name: '--canvas', value: '#fafaf8', dark: '#100f0e', usage: 'Application background behind all panels.' },
{ name: '--surface', value: '#ffffff', dark: '#1a1917', usage: 'Standard panel, card, and table surface.' },
{ name: '--surface-subtle', value: '#f4f4f1', dark: '#222120', usage: 'Table headers, footers, inset groupings.' },
{ name: '--surface-sunken', value: '#f4f4f1', dark: '#151413', usage: 'Verbatim records and source events. Reads as recessed.' },
{ name: '--surface-raised', value: '#ffffff', dark: '#262523', usage: 'Popovers, dialogs, toasts. In dark mode it lightens rather than adding shadow.' },
{ name: '--surface-interactive-hover', value: '#f4f4f1', dark: '#2b2a27', usage: 'Row and control hover.' },
{ name: '--surface-interactive-active', value: '#eaeae6', dark: '#34322f', usage: 'Pressed and current-page states.' },
{ name: '--surface-selected', value: '#fef1ec', dark: '#2e1c12', usage: 'Selected table row or list item. Paired with a left marker.' },
{ name: '--overlay-scrim', value: 'rgba(20,19,18,0.42)', dark: 'rgba(0,0,0,0.62)', usage: 'Behind modals and critical overlays.' }];


export const semanticForeground: TokenRow[] = [
{ name: '--fg-primary', value: '#232220', dark: '#f2f1ee', usage: 'Body and heading text.', note: '14.8:1 light, 15.6:1 dark' },
{ name: '--fg-secondary', value: '#56554f', dark: '#c4c2bc', usage: 'Supporting prose, table cells.', note: '7.4:1 light, 9.7:1 dark' },
{ name: '--fg-muted', value: '#71706a', dark: '#9b9992', usage: 'Metadata, timestamps, hints.', note: '4.6:1 light, 5.4:1 dark. Never for decision-critical text.' },
{ name: '--fg-disabled', value: '#bfbfb8', dark: '#605e59', usage: 'Disabled control labels. Always paired with a disabled state, never alone.' },
{ name: '--fg-on-accent', value: '#ffffff', dark: '#1a0d06', usage: 'Text on the accent solid.', note: '4.6:1 on orange-500, 8.9:1 on orange-400' },
{ name: '--fg-on-inverse', value: '#f4f4f1', dark: '#232220', usage: 'Text on inverse surfaces.' }];


export const semanticStatus: TokenRow[] = [
{ name: '--info-fg / -bg / -border', value: '#1a44b4 / #eef4ff / #b9cffb', dark: '#9dbcfb / #14203a / #294478', usage: 'Neutral system information. Never an assessment outcome.' },
{ name: '--success-fg / -bg / -border', value: '#1a5c39 / #ecf7f0 / #bfdecb', dark: '#7cc79c / #10241a / #245239', usage: 'Save confirmed, connection restored, submission received.' },
{ name: '--warning-fg / -bg / -border', value: '#7a4f0c / #fdf6e6 / #f0d99b', dark: '#e0b45c / #2a2010 / #574220', usage: 'Unstable connection, queued changes, approaching time limit.' },
{ name: '--danger-fg / -bg / -border', value: '#86241c / #fdf0ef / #f2c1bc', dark: '#ee9086 / #2c1512 / #5c2a24', usage: 'Failed action, destructive confirmation, data at risk.' },
{ name: '--neutral-status-*', value: '#56554f / #f4f4f1 / #dcdcd7', dark: '#c4c2bc / #26251f / #3d3b37', usage: 'Inert status: draft, archived, scheduled.' }];


export const semanticProvenance: TokenRow[] = [
{ name: '--ai-fg', value: '#4a4370', dark: '#b6aede', usage: 'AI attribution label and icon. 8.1:1 on the AI surface.' },
{ name: '--ai-bg', value: '#f4f2fa', dark: '#1d1b2b', usage: 'Background of AI-authored regions.' },
{ name: '--ai-border', value: '#b9b3cf', dark: '#423c63', usage: 'The 2px left rule on every AI-authored block.' },
{ name: '--human-fg', value: '#232220', dark: '#f2f1ee', usage: 'Reviewer decision text. Full-weight, full-contrast.' },
{ name: '--human-bg', value: '#ffffff', dark: '#1a1917', usage: 'Solid surface for accountable conclusions.' },
{ name: '--human-border', value: '#3a3934', dark: '#85827a', usage: 'The 2px left rule on reviewer decisions. Darker than any AI rule.' }];


export const componentTokens: TokenRow[] = [
{ name: '--btn-primary-bg', value: '→ --accent-solid', usage: 'Primary button fill.' },
{ name: '--btn-secondary-border', value: '→ --border-default', usage: 'Secondary button outline.' },
{ name: '--input-border-focus', value: '→ --accent-border', usage: 'Focused input outline.' },
{ name: '--msg-user-bg', value: '→ --surface-subtle', usage: 'User message inset block.' },
{ name: '--msg-assistant-rule', value: '→ --ai-border', usage: 'Left rule on assistant messages.' },
{ name: '--table-row-hover', value: '→ --surface-interactive-hover', usage: 'Reviewer queue row hover.' },
{ name: '--timer-fg-final', value: '→ --amber-700', usage: 'Timer under 10 minutes. Amber, never red.' },
{ name: '--rail-active-marker', value: '→ --accent-solid', usage: 'The 2px marker beside the active nav item.' }];


export const spacingScale = [
{ token: '--space-0', value: '0px', use: 'Collapsed gaps in flush groups' },
{ token: '--space-1', value: '1px', use: 'Hairline offsets, focus insets' },
{ token: '--space-2', value: '2px', use: 'Icon nudges, badge internals' },
{ token: '--space-4', value: '4px', use: 'Icon-to-label, tight chip padding' },
{ token: '--space-6', value: '6px', use: 'Compact row padding' },
{ token: '--space-8', value: '8px', use: 'Default inline gap, control padding' },
{ token: '--space-10', value: '10px', use: 'Comfortable row padding' },
{ token: '--space-12', value: '12px', use: 'Card padding (compact), field gap' },
{ token: '--space-16', value: '16px', use: 'Card padding (default), stack gap' },
{ token: '--space-20', value: '20px', use: 'Chat message gap (default)' },
{ token: '--space-24', value: '24px', use: 'Section gap, page gutter (mobile)' },
{ token: '--space-32', value: '32px', use: 'Page gutter (desktop), major section gap' },
{ token: '--space-40', value: '40px', use: 'Report section separation' },
{ token: '--space-48', value: '48px', use: 'Page top padding on candidate surfaces' },
{ token: '--space-64', value: '64px', use: 'Empty-state and completion-state breathing room' },
{ token: '--space-80', value: '80px', use: 'Maximum vertical rhythm. Nothing exceeds this.' }];


export const radiusScale = [
{ token: '--radius-0', value: '0px', use: 'Table cells, full-bleed panel edges, dividers' },
{ token: '--radius-xs', value: '3px', use: 'Tags, status badges, checkboxes, nested chips' },
{ token: '--radius-sm', value: '4px', use: 'Buttons, inputs, selects, segmented controls' },
{ token: '--radius-md', value: '6px', use: 'Cards, panels, alerts, message blocks' },
{ token: '--radius-lg', value: '8px', use: 'Popovers, menus, toasts' },
{ token: '--radius-xl', value: '10px', use: 'Dialogs and drawers only' },
{ token: '--radius-full', value: '9999px', use: 'Avatars and progress tracks. Never on buttons or badges.' }];


export const motionDurations = [
{ token: '--duration-1', value: '100ms', use: 'Press feedback, hover colour, icon-button states' },
{ token: '--duration-2', value: '140ms', use: 'Toggle travel, disclosure chevron rotation' },
{ token: '--duration-3', value: '180ms', use: 'Tooltips, small popovers, toast entry' },
{ token: '--duration-4', value: '220ms', use: 'Dropdowns, selects, panel collapse' },
{ token: '--duration-5', value: '280ms', use: 'Dialogs, drawers, progress fill. The ceiling.' }];