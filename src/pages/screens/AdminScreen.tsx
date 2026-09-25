import React, { useState } from 'react';
import { MailIcon, PlusIcon, ShieldIcon } from 'lucide-react';
import { ScreenFrame } from '../../components/docs/ScreenFrame';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Alert } from '../../components/ui/Alert';
import { EmptyState } from '../../components/ui/EmptyState';
import { Avatar } from '../../components/ui/Avatar';
import { Progress } from '../../components/ui/Progress';
import { OpportunityStateBadge } from '../../components/evidence/OpportunityStateBadge';
import { EvidenceStateBadge } from '../../components/evidence/EvidenceStateBadge';

interface InviteRow {
  id: string;
  name: string;
  email: string;
  assessment: string;
  status: 'invited' | 'started' | 'completed' | 'expired';
  sent: string;
  activity: string;
}

const invites: InviteRow[] = [
{ id: 'NW-2291', name: 'R. Adeyemi', email: 'r.adeyemi@example.com', assessment: 'Campaign positioning', status: 'completed', sent: '12 Aug', activity: 'Submitted 14 Aug, 13:54' },
{ id: 'NW-2304', name: 'T. Lindqvist', email: 't.lindqvist@example.com', assessment: 'Campaign positioning', status: 'completed', sent: '12 Aug', activity: 'Submitted 14 Aug, 10:22' },
{ id: 'NW-2312', name: 'M. Haddad', email: 'm.haddad@example.com', assessment: 'Outbound sequence review', status: 'completed', sent: '12 Aug', activity: 'Submitted 15 Aug, 16:41' },
{ id: 'NW-2318', name: 'S. Oyelaran', email: 's.oyelaran@example.com', assessment: 'Campaign positioning', status: 'started', sent: '14 Aug', activity: 'In progress, 22 min elapsed' },
{ id: 'NW-2320', name: 'K. Novák', email: 'k.novak@example.com', assessment: 'Campaign positioning', status: 'invited', sent: '15 Aug', activity: 'Not opened' },
{ id: 'NW-2277', name: 'D. Ferreira', email: 'd.ferreira@example.com', assessment: 'Outbound sequence review', status: 'expired', sent: '02 Aug', activity: 'Invitation expired 09 Aug' }];


const statusTone = {
  invited: 'neutral',
  started: 'info',
  completed: 'success',
  expired: 'warning'
} as const;

const statusLabel = {
  invited: 'Invited',
  started: 'In progress',
  completed: 'Completed',
  expired: 'Expired'
} as const;

interface IssueRow {
  id: string;
  candidate: string;
  kind: string;
  detail: string;
  window: string;
  resolution: string;
}

const issues: IssueRow[] = [
{
  id: 'NW-2291',
  candidate: 'R. Adeyemi',
  kind: 'capture-failed',
  detail: 'Connection lost for 1m 52s during the task',
  window: '14 Aug, 13:38–13:40',
  resolution: 'Draft preserved. Description marked not assessed.'
},
{
  id: 'NW-2318',
  candidate: 'S. Oyelaran',
  kind: 'invalid',
  detail: 'Reference document failed to load on first open',
  window: '15 Aug, 11:04',
  resolution: 'Time extended by 6 minutes. Candidate notified in session.'
}];


interface QueueRow {
  id: string;
  candidate: string;
  reviewer: string;
  state: 'approved' | 'escalation' | 'disagreement';
  due: string;
  progress: number;
}

const queue: QueueRow[] = [
{ id: 'NW-2291', candidate: 'R. Adeyemi', reviewer: 'J. Okonkwo', state: 'approved', due: 'Released', progress: 100 },
{ id: 'NW-2304', candidate: 'T. Lindqvist', reviewer: 'J. Okonkwo', state: 'disagreement', due: 'Due 17 Aug', progress: 60 },
{ id: 'NW-2312', candidate: 'M. Haddad', reviewer: 'A. Bergström', state: 'escalation', due: 'Due 18 Aug', progress: 25 }];


const permissions = [
{ role: 'Organisation administrator', people: 2, can: 'Configure assessments, invite candidates, manage roles, set retention' },
{ role: 'Assessment reviewer', people: 5, can: 'Read sessions, write evaluations, approve reports' },
{ role: 'Hiring manager', people: 11, can: 'Read released reports for their own requisitions only' },
{ role: 'Observer', people: 3, can: 'Read released reports. No session access' }];


const audit = [
{ at: '15 Aug, 09:41', who: 'J. Okonkwo', what: 'Released report NW-2291 to 2 hiring managers' },
{ at: '15 Aug, 09:19', who: 'J. Okonkwo', what: 'Overrode 1 AI interpretation on NW-2291 (Discernment)' },
{ at: '15 Aug, 08:02', who: 'System', what: 'Recorded evidence capture failure on NW-2291' },
{ at: '14 Aug, 17:30', who: 'L. Mensah', what: 'Changed report access for Hiring manager role' }];


export function AdminScreen() {
  const [tab, setTab] = useState('invitations');
  const [query, setQuery] = useState('');

  const inviteCols: Column<InviteRow>[] = [
  {
    id: 'candidate',
    header: 'Candidate',
    sticky: true,
    width: '260px',
    cell: (r) =>
    <span className="flex items-center gap-2.5">
          <Avatar name={r.name} kind="person" size="sm" />
          <span className="min-w-0">
            <span className="block truncate text-13 font-medium text-fg-primary">{r.name}</span>
            <span className="block truncate text-2xs text-fg-muted">{r.email}</span>
          </span>
        </span>

  },
  { id: 'ref', header: 'Reference', width: '110px', cell: (r) => <span className="font-mono text-2xs text-fg-muted">{r.id}</span> },
  { id: 'assessment', header: 'Assessment', cell: (r) => r.assessment },
  { id: 'status', header: 'Status', width: '130px', cell: (r) => <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge> },
  { id: 'sent', header: 'Invited', width: '90px', cell: (r) => r.sent },
  { id: 'activity', header: 'Latest activity', cell: (r) => <span className="text-fg-secondary">{r.activity}</span> }];


  const filtered = invites.filter(
    (r) =>
    !query.trim() ||
    `${r.name} ${r.email} ${r.id} ${r.assessment}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <ScreenFrame
      title="Assessment administration"
      audience="Organisation administrator"
      summary="Invitations and completion tracking, a candidate-issues queue that surfaces capture failures before they reach a report, the review queue with assignment, report release behind an explicit gate, and permissions with audit history. Compact density throughout."
      uses={['DataTable', 'Tabs', 'Badge', 'Progress', 'OpportunityStateBadge', 'EvidenceStateBadge', 'EmptyState']}>
      
      <div data-density="compact">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-fg-primary">Northwind Analytics</h2>
            <p className="mt-0.5 text-2xs text-fg-muted">6 invitations, 3 completed, 2 candidate issues open</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<MailIcon className="h-3.5 w-3.5" />}>
              Resend pending
            </Button>
            <Button variant="primary" size="sm" icon={<PlusIcon className="h-3.5 w-3.5" />}>
              Invite candidates
            </Button>
          </div>
        </div>

        <Tabs
          className="mt-5"
          label="Administration sections"
          value={tab}
          onChange={setTab}
          items={[
          { id: 'invitations', label: 'Invitations', count: invites.length },
          { id: 'issues', label: 'Candidate issues', count: issues.length },
          { id: 'queue', label: 'Review queue', count: queue.length },
          { id: 'access', label: 'Access and audit' }]
          } />
        

        <div className="mt-5">
          {tab === 'invitations' &&
          <div className="overflow-hidden rounded-md border border-line bg-surface">
              <div className="border-b border-line bg-surface-subtle p-2.5">
                <SearchInput
                id="admin-search"
                label="Search candidates"
                value={query}
                onChange={setQuery}
                placeholder="Search by name, email, or reference" />
              
              </div>
              <DataTable
              caption="Candidate invitations and their current status"
              columns={inviteCols}
              rows={filtered}
              rowKey={(r) => r.id}
              empty={
              <EmptyState
                kind="no-results"
                title="No candidates match that search"
                description="Check the spelling, or clear the search to see all invitations." />

              } />
            
            </div>
          }

          {tab === 'issues' &&
          <div className="flex flex-col gap-4">
              <Alert
              tone="warning"
              title="2 candidates were affected by a system issue"
              children="Review each one before its report is released. An issue on our side must never be recorded as candidate performance." />
            
              <ul className="flex flex-col gap-2.5">
                {issues.map((i) =>
              <li key={i.id} className="rounded-md border border-line bg-surface p-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-13 font-semibold text-fg-primary">
                          {i.candidate} <span className="font-mono text-2xs font-normal text-fg-muted">{i.id}</span>
                        </p>
                        <p className="mt-1 text-13 leading-6 text-fg-secondary">{i.detail}</p>
                        <p className="mt-1 font-mono text-2xs text-fg-muted">{i.window}</p>
                      </div>
                      <OpportunityStateBadge state={i.kind as 'capture-failed' | 'invalid'} size="sm" />
                    </div>
                    <p className="mt-2.5 border-t border-line-subtle pt-2.5 text-13 leading-6 text-fg-secondary">
                      <span className="font-medium text-fg-primary">Resolution: </span>
                      {i.resolution}
                    </p>
                  </li>
              )}
              </ul>
            </div>
          }

          {tab === 'queue' &&
          <ul className="flex flex-col gap-2.5">
              {queue.map((q) =>
            <li key={q.id} className="rounded-md border border-line bg-surface p-3.5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-13 font-semibold text-fg-primary">
                        {q.candidate} <span className="font-mono text-2xs font-normal text-fg-muted">{q.id}</span>
                      </p>
                      <p className="mt-0.5 text-2xs text-fg-muted">
                        Reviewer: {q.reviewer}, {q.due}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <EvidenceStateBadge state={q.state} size="sm" />
                      <Button variant={q.state === 'approved' ? 'secondary' : 'primary'} size="sm" disabled={q.state === 'approved'}>
                        {q.state === 'approved' ? 'Released' : 'Open review'}
                      </Button>
                    </div>
                  </div>
                  <Progress
                className="mt-3"
                label="Evaluation progress"
                value={q.progress}
                valueText={`${q.progress}% of moments evaluated`} />
              
                  {q.state !== 'approved' &&
              <p className="mt-2.5 rounded-xs border border-dashed border-line-strong px-2 py-1.5 text-2xs leading-5 text-fg-secondary">
                      Report release is gated on reviewer approval. No report is shared with a hiring manager until a
                      named reviewer has approved it.
                    </p>
              }
                </li>
            )}
            </ul>
          }

          {tab === 'access' &&
          <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-md border border-line bg-surface">
                <h3 className="flex items-center gap-2 border-b border-line-subtle bg-surface-subtle px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  <ShieldIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Roles and report access
                </h3>
                <ul className="divide-y divide-line-subtle">
                  {permissions.map((p) =>
                <li key={p.role} className="px-3 py-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-13 font-medium text-fg-primary">{p.role}</p>
                        <span className="text-2xs text-fg-muted tnum">{p.people} people</span>
                      </div>
                      <p className="mt-1 text-2xs leading-5 text-fg-secondary">{p.can}</p>
                    </li>
                )}
                </ul>
                <p className="border-t border-line px-3 py-2.5 text-2xs leading-5 text-fg-secondary">
                  Session recordings are visible to reviewers only. Hiring managers see released reports, never raw
                  session data. Candidates can request their own report at any time.
                </p>
              </section>

              <section className="rounded-md border border-line bg-surface">
                <h3 className="border-b border-line-subtle bg-surface-subtle px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Audit history
                </h3>
                <ol className="divide-y divide-line-subtle">
                  {audit.map((a) =>
                <li key={a.at} className="px-3 py-2.5">
                      <p className="font-mono text-2xs text-fg-muted tnum">{a.at}</p>
                      <p className="mt-1 text-13 leading-6 text-fg-secondary">
                        <span className="font-medium text-fg-primary">{a.who}</span> — {a.what}
                      </p>
                    </li>
                )}
                </ol>
                <p className="border-t border-line px-3 py-2.5 text-2xs leading-5 text-fg-secondary">
                  Every override, release, and permission change is recorded against a named person. Retention is 24
                  months, after which session data is deleted and reports are anonymised.
                </p>
              </section>
            </div>
          }
        </div>
      </div>
    </ScreenFrame>);

}