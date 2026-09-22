export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
{
  id: 'system',
  label: 'System',
  items: [
  { label: 'Overview', to: '/' },
  { label: 'Principles', to: '/principles' },
  { label: 'Visual direction', to: '/direction' }]

},
{
  id: 'foundations',
  label: 'Foundations',
  items: [
  { label: 'Token architecture', to: '/foundations/tokens' },
  { label: 'Colour', to: '/foundations/color' },
  { label: 'Typography', to: '/foundations/typography' },
  { label: 'Spacing & density', to: '/foundations/spacing' },
  { label: 'Border', to: '/foundations/border' },
  { label: 'Elevation', to: '/foundations/elevation' },
  { label: 'Radius', to: '/foundations/radius' },
  { label: 'Layout', to: '/foundations/layout' },
  { label: 'Motion', to: '/foundations/motion' }]

},
{
  id: 'patterns',
  label: 'Patterns',
  items: [
  { label: 'Behavioural framework', to: '/patterns/framework' },
  { label: 'Evidence and review', to: '/patterns/evidence' },
  { label: 'AI interaction', to: '/patterns/ai' },
  { label: 'Progress and levels', to: '/patterns/progress' },
  { label: 'Candidate shell', to: '/patterns/candidate-shell' }]

},
{
  id: 'screens',
  label: 'Example screens',
  items: [
  { label: 'Candidate workspace', to: '/screens/workspace' },
  { label: 'Reviewer evidence', to: '/screens/reviewer' },
  { label: 'Candidate report', to: '/screens/report' },
  { label: 'Candidate comparison', to: '/screens/comparison' },
  { label: 'Administration', to: '/screens/admin' }]

},
{
  id: 'standards',
  label: 'Standards',
  items: [
  { label: 'Contrast audit', to: '/standards/contrast' },
  { label: 'Accessibility', to: '/standards/accessibility' },
  { label: 'Content and tone', to: '/standards/content' },
  { label: 'QA checklist', to: '/standards/qa' }]

}];