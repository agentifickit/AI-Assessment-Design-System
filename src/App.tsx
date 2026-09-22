import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SystemProvider } from './contexts/SystemContext';
import { DocsShell } from './components/docs/DocsShell';

import { OverviewPage } from './pages/OverviewPage';
import { PrinciplesPage } from './pages/PrinciplesPage';
import { DirectionPage } from './pages/DirectionPage';

import { TokensPage } from './pages/foundations/TokensPage';
import { ColorPage } from './pages/foundations/ColorPage';
import { TypographyPage } from './pages/foundations/TypographyPage';
import { SpacingPage } from './pages/foundations/SpacingPage';
import { BorderPage } from './pages/foundations/BorderPage';
import { ElevationPage } from './pages/foundations/ElevationPage';
import { RadiusPage } from './pages/foundations/RadiusPage';
import { LayoutPage } from './pages/foundations/LayoutPage';
import { MotionPage } from './pages/foundations/MotionPage';

import { FrameworkPage } from './pages/patterns/FrameworkPage';
import { EvidencePage } from './pages/patterns/EvidencePage';
import { AiPage } from './pages/patterns/AiPage';
import { ProgressPage } from './pages/patterns/ProgressPage';
import { CandidateShellPage } from './pages/patterns/CandidateShellPage';

import { WorkspaceScreen } from './pages/screens/WorkspaceScreen';
import { ReviewerScreen } from './pages/screens/ReviewerScreen';
import { ReportScreen } from './pages/screens/ReportScreen';
import { ComparisonScreen } from './pages/screens/ComparisonScreen';
import { AdminScreen } from './pages/screens/AdminScreen';

import { ContrastAuditPage } from './pages/standards/ContrastAuditPage';
import { AccessibilityPage } from './pages/standards/AccessibilityPage';
import { ContentPage } from './pages/standards/ContentPage';
import { QaPage } from './pages/standards/QaPage';

import type { Density, Theme } from './types/system';

interface AppProps {
  theme?: Theme;
  density?: Density;
}

export function App({ theme = 'light', density = 'default' }: AppProps) {
  return (
    <SystemProvider theme={theme} density={density}>
      <BrowserRouter>
        <DocsShell>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/principles" element={<PrinciplesPage />} />
            <Route path="/direction" element={<DirectionPage />} />

            <Route path="/foundations/tokens" element={<TokensPage />} />
            <Route path="/foundations/color" element={<ColorPage />} />
            <Route path="/foundations/typography" element={<TypographyPage />} />
            <Route path="/foundations/spacing" element={<SpacingPage />} />
            <Route path="/foundations/border" element={<BorderPage />} />
            <Route path="/foundations/elevation" element={<ElevationPage />} />
            <Route path="/foundations/radius" element={<RadiusPage />} />
            <Route path="/foundations/layout" element={<LayoutPage />} />
            <Route path="/foundations/motion" element={<MotionPage />} />

            <Route path="/patterns/framework" element={<FrameworkPage />} />
            <Route path="/patterns/evidence" element={<EvidencePage />} />
            <Route path="/patterns/ai" element={<AiPage />} />
            <Route path="/patterns/progress" element={<ProgressPage />} />
            <Route path="/patterns/candidate-shell" element={<CandidateShellPage />} />

            <Route path="/screens/workspace" element={<WorkspaceScreen />} />
            <Route path="/screens/reviewer" element={<ReviewerScreen />} />
            <Route path="/screens/report" element={<ReportScreen />} />
            <Route path="/screens/comparison" element={<ComparisonScreen />} />
            <Route path="/screens/admin" element={<AdminScreen />} />

            <Route path="/standards/contrast" element={<ContrastAuditPage />} />
            <Route path="/standards/accessibility" element={<AccessibilityPage />} />
            <Route path="/standards/content" element={<ContentPage />} />
            <Route path="/standards/qa" element={<QaPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DocsShell>
      </BrowserRouter>
    </SystemProvider>);

}