import React, { useState } from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { FileDrop, FileRow } from '../../components/ui/FileDrop';
import { CopyField } from '../../components/ui/CopyField';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { Tabs } from '../../components/ui/Tabs';

const fileNeeds = [
{ key: 'Columns', value: 'A first row that names the columns: name and email' },
{ key: 'Candidates', value: 'Up to 200 in one file' },
{ key: 'Other columns', value: 'Ignored, so an export from another system works as it is' }];


const invitee = [
{ key: 'Name', value: 'Maya Chen' },
{ key: 'Email', value: 'm***@example.com' },
{ key: 'Organization', value: 'Acme Corp' }];


function formatSize(bytes: number): string {
  return bytes < 1024 ? `${bytes} B` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function IntakePage() {
  const [open, setOpen] = useState<null | 'intake' | 'confirm'>(null);
  const [tab, setTab] = useState('csv');
  const [file, setFile] = useState<{name: string;size: number;} | null>(null);

  const closeDialog = () => setOpen(null);

  const csvBody =
  <div className="flex flex-col gap-4">
      <Field id="intake-csv" label="CSV file">
        {file ?
      <FileRow name={file.name} meta={formatSize(file.size)} onRemove={() => setFile(null)} /> :

      <FileDrop
        id="intake-csv"
        accept=".csv,text/csv"
        prompt="Drop a CSV here, or"
        hint="CSV, up to 200 candidates"
        onFile={(f) => setFile({ name: f.name, size: f.size })} />

      }
      </Field>
      <div>
        <p className="text-13 font-semibold text-fg-primary">What the file needs</p>
        <KeyValueList className="mt-1" keyColumn={112} size="lg" items={fileNeeds} />
      </div>
    </div>;


  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Intake and sharing"
        intro="How a recruiter brings people in and hands them a link: a dialog on the system's documented widths, a place to drop one file, the chosen file as a row, a value to copy, and facts set beside their keys. Approved with candidate intake (PLU-097 v0.3, 2026-09-27: DS-21 to DS-25) and the invitation landing (PLU-128). Issues #17 and #18." />


      <DocSection
        title="Dialog"
        description="One surface: the title in heading-2 (18/28), the description under it, the body in the flow and the actions 16px below it, right-aligned with the confirming one last. No hairline under the header and no footer bar. Widths are sm 420, md 560 for results and confirmations, and lg 720 for intake. The panel never grows past the viewport less 96px; the body scrolls inside it. Issue #18, after the approved PLU-092 and PLU-097 dialogs.">

        <Example label="Open a dialog" tone="surface">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setOpen('intake')}>Invite candidates (lg)</Button>
            <Button onClick={() => setOpen('confirm')}>Reissue a link (md)</Button>
          </div>
        </Example>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'Surface', detail: 'surface-raised, radius-xl, shadow-dialog, border-default; the overlay-scrim behind.' },
          { term: 'Header', detail: 'heading-2 title, 13px description in fg-secondary, the close control at the top right. critical and locked remove the close control.' },
          { term: 'Spacing', detail: '20px inside the panel, 16px from the header to the body and from the body to the actions.' },
          { term: 'Footer', detail: 'Right-aligned buttons with no bar behind them. A critical dialog adds its note at the left.' }]
          } />

      </DocSection>

      <DocSection
        title="File drop and the chosen file"
        description="A surface-subtle panel with a hairline border, never dashed, since dashed is the system's mark for an absence. A 20px upload glyph, the prompt with choose a file as a link, and the hint beneath. The border firms while a file is dragged over. Choosing a file never advances by itself: the drop becomes a FileRow with Remove, and the dialog's own action goes on from there. PLU-097 DS-22.">

        <div className="grid gap-3 lg:grid-cols-2">
          <Example label="FileDrop inside a Field" tone="surface">
            <Field id="intake-csv-demo" label="CSV file">
              <FileDrop id="intake-csv-demo" accept=".csv,text/csv" prompt="Drop a CSV here, or" hint="CSV, up to 200 candidates" onFile={() => undefined} />
            </Field>
          </Example>
          <Example label="FileRow once a file is chosen" note="Remove is disabled while the file is read" tone="surface">
            <div className="flex flex-col gap-2">
              <FileRow name="candidates-september.csv" meta="4 KB" onRemove={() => undefined} />
              <FileRow name="candidates-september.csv" meta="4 KB" onRemove={() => undefined} disabled />
            </div>
          </Example>
        </div>
        <DoDont
          className="mt-4"
          doText="Accept one file, say its kind and limits in the hint, and let the reader change their mind with Remove before anything is added."
          dontText="Start the import the moment a file lands, or draw the panel with a dashed border." />

      </DocSection>

      <DocSection
        title="CopyField"
        description="A value the reader copies rather than edits: a read-only mono field on surface-subtle with a secondary Copy button beside it, both 32px. Focusing the field selects the whole value. A copy that works turns the button's glyph to a check for two seconds and is announced politely; nothing else moves. A copy the browser refuses raises a danger Toast and leaves the value selected for a manual copy. PLU-097 DS-24.">

        <Example label="CopyField" tone="surface">
          <CopyField
            className="max-w-[560px]"
            label="Priya Shah's link"
            hint="Works until 10 Oct. Send it from your own email."
            value="https://app.pluralhire.com/i/8Fq2mZkLwR4tYp"
            copyLabel="Copy link"
            copiedMessage="Link copied" />

        </Example>
      </DocSection>

      <DocSection
        title="Facts beside their keys"
        description="KeyValueList rows with keyColumn set a fixed key column and start the value 12px after it, left-aligned, as facts about one person or one file read. Rows stay 36px with border-subtle hairlines between them. size lg sets the values in body-base (14/20) for candidate-facing facts. Without keyColumn the value sits at the right edge, as before. Issue #17.">

        <div className="grid gap-3 lg:grid-cols-2">
          <Example label={'keyColumn={96} size="lg"'} note="The invitation landing (PLU-128)" tone="surface">
            <KeyValueList keyColumn={96} size="lg" items={invitee} />
            <p className="mt-3 text-caption-lg text-fg-muted">
              Not you? Don&apos;t start. Reply to the message that brought you this link and let the sender know.
            </p>
          </Example>
          <Example label="Default rows" note="Value at the right edge" tone="surface">
            <KeyValueList items={invitee} />
          </Example>
        </div>
        <SpecList
          className="mt-4"
          entries={[
          { term: 'caption-lg', detail: 'A named type step, 12/18 (text-caption-lg): secondary metadata that reads as a phrase, like the line under the facts above. Chrome, never decision-critical. DS-20.' }]
          } />

      </DocSection>

      <Dialog
        open={open === 'intake'}
        onClose={closeDialog}
        width="lg"
        title="Invite candidates"
        description="Each candidate gets a link that works only for them, for this assessment. Plural does not send email: you copy the links and send them yourself."
        footer={
        <>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button variant="primary" disabled={!file}>
              Review rows
            </Button>
          </>
        }>

        <Tabs
          label="How to add candidates"
          value={tab}
          onChange={setTab}
          items={[
          { id: 'csv', label: 'Upload a CSV' },
          { id: 'one', label: 'Add one' }]
          } />

        <div className="pt-4">{tab === 'csv' ? csvBody : <p className="text-13 text-fg-secondary">The single-candidate form goes here.</p>}</div>
      </Dialog>

      <Dialog
        open={open === 'confirm'}
        onClose={closeDialog}
        width="md"
        title="Reissue Priya Shah's link?"
        footer={
        <>
            <Button onClick={closeDialog}>Keep current link</Button>
            <Button variant="primary" onClick={closeDialog}>
              Reissue link
            </Button>
          </>
        }>

        <div className="flex flex-col gap-2 text-13 text-fg-secondary">
          <p>The link Priya has now stops working as soon as you reissue it. The new link works until 10 Oct.</p>
          <p>Priya is part-way through the assessment. The work done so far is kept, and the new link opens it where it was left.</p>
        </div>
      </Dialog>
    </>);

}
