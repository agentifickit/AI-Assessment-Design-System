import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { Stepper } from '../../components/ui/Stepper';
import { Progress } from '../../components/ui/Progress';
import { LevelMeter } from '../../components/evidence/LevelMeter';
import { BehaviourRating } from '../../components/evidence/BehaviourRating';

const stages = [
{ id: 'role', label: 'Role' },
{ id: 'work', label: 'Work' },
{ id: 'ai', label: 'AI fluency' },
{ id: 'scenario', label: 'Scenario' }];


const bands = [
{ id: 'low', label: 'Low' },
{ id: 'medium', label: 'Medium' },
{ id: 'high', label: 'High' }];


export function ProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Progress and levels"
        intro="Three components say where something stands. Progress is a single quantity against a total. Stepper is the milestones of a multi-step flow, and with its progress prop it also carries how far the current step has come. LevelMeter places a derived band on a range. None of them is a score: a candidate is rated with named bands, never a meter." />
      

      <DocSection
        title="Stepper with integrated progress"
        description="Approved with the assessment-creation wizard (PLU-092 v1.11, D-33). The progress prop, 0 to 1 per step, turns the 16px hairline connectors into 3px tracks with an action-coloured fill, so milestones and in-step progress are one component and the page carries no separate progress line. Only the current step's entry is read: done steps are full and future steps empty, so the fill can never contradict the markers. Without the prop the component is unchanged.">
        
        <div className="grid gap-3">
          <Example label="Stepper without the progress prop" note="Unchanged: 16px hairline connectors">
            <Stepper label="Assessment setup" steps={stages} current={1} />
          </Example>
          <Example label="Stepper with progress: second step half done" note="progress={[1, 0.5, 0, 0]} connectorWidth={56}">
            <Stepper label="Assessment setup" steps={stages} current={1} progress={[1, 0.5, 0, 0]} connectorWidth={56} />
          </Example>
          <Example label="Stepper with progress: third step a quarter done" note="progress={[1, 1, 0.25, 0]} connectorWidth={56}">
            <Stepper label="Assessment setup" steps={stages} current={2} progress={[1, 1, 0.25, 0]} connectorWidth={56} />
          </Example>
          <Example label="Stepper with progress: last step, every connector full" note="progress={[1, 1, 1, 0]} connectorWidth={56}">
            <Stepper label="Assessment setup" steps={stages} current={3} progress={[1, 1, 1, 0]} connectorWidth={56} />
          </Example>
        </div>

        <SpecList
          className="mt-4"
          entries={[
          { term: 'Track', detail: '3px, line colour, full radius. The same colour as the hairline connector, so the only change with the prop is thickness and fill.' },
          { term: 'Fill', detail: 'Action surface (the same orange as the active marker), width from the current step’s progress. Width animates on duration-280 ease-enter.' },
          { term: 'Connector width', detail: 'connectorWidth in px, default 16. The wizard uses 56 so a partial fill is legible. There are n minus 1 connectors, so the last step\u2019s own progress has nowhere to show; its marker carries it.' },
          { term: 'Markers', detail: 'Unchanged: done is a check on fg-primary, current a numeral on the action surface, future a dashed outline.' },
          { term: 'Caption', detail: 'None. The markers carry the count, so "Step 2 of 4" never appears, in the component or in a page eyebrow.' },
          { term: 'Accessibility', detail: 'The nav and ordered list announce the steps; the current one has aria-current="step". Connectors and their fill are decorative and aria-hidden.' }]
          } />
        

        <DoDont
          className="mt-4"
          doText="Pass a single number for the current step and let the chips say which steps are done. Use the wider connector whenever the fill matters."
          dontText="Draw a separate progress line under or beside the stepper, or add a caption that repeats the count. Milestones and progress are one component." />
        
      </DocSection>

      <DocSection
        title="LevelMeter"
        description="Approved with the assessment-creation wizard (PLU-092 v1.11, D-30). A horizontal bar with a three-stop gradient from green-400 through amber-400 to orange-500, a marker at the band's position and the band labels beneath, the current one emphasised. It shows how much of something a situation calls for, such as how much AI fluency a role needs. The gradient reads as more, never as better, and the band word is always rendered so colour is never the only cue.">
        
        <div className="grid gap-3">
          <Example label="LevelMeter: Low" tone="surface">
            <LevelMeter label="AI fluency for this role" bands={bands} value="low" className="max-w-[640px]" />
          </Example>
          <Example label="LevelMeter: Medium" tone="surface">
            <LevelMeter label="AI fluency for this role" bands={bands} value="medium" className="max-w-[640px]" />
          </Example>
          <Example label="LevelMeter: High" tone="surface">
            <LevelMeter label="AI fluency for this role" bands={bands} value="high" className="max-w-[640px]" />
          </Example>
        </div>

        <SpecList
          className="mt-4"
          entries={[
          { term: 'Bar', detail: '10px tall, full radius, linear gradient green-400 → amber-400 → orange-500 from the primitive tokens. Fills its container; the wizard sets 640px.' },
          { term: 'Marker', detail: '18px circle, 2px fg-primary outline on the surface colour, centred on the current band’s share of the bar.' },
          { term: 'Labels', detail: 'One per band, centred under its share of the bar, 12px. The current band is semibold fg-primary; the others fg-muted.' },
          { term: 'Bands', detail: 'Ordered from lowest to highest by the caller; any count of two or more. The wizard uses Low, Medium, High.' },
          { term: 'Accessibility', detail: 'role="img" with an aria-label of the form "AI fluency for this role: High". The marker outline reaches 3:1 on every gradient stop (see the contrast audit).' },
          { term: 'Where it may appear', detail: 'Derived levels about a role, a scenario or a requirement. Never on a candidate.' }]
          } />
        

        <DoDont
          className="mt-4"
          doTitle="Do"
          dontTitle="Not this"
          doText={
          <>
              Use it for a level that describes the situation, and name the band beside or above the meter as well. The reader should be able to quote the word.
            </>
          }
          dontText={
          <>
              Use it for a candidate&apos;s behaviour. A person&apos;s rating is <code className="font-mono text-2xs">BehaviourRating</code>: named bands, no gauge, no hue that implies better or worse.
            </>
          } />
        
      </DocSection>

      <DocSection
        title="The rule, narrowed"
        description={
        <>
            The system&apos;s principle was &ldquo;no gauges, no numeric scores, anywhere&rdquo;. With <code className="font-mono text-2xs">LevelMeter</code> that prohibition is narrowed to candidate ratings: a candidate is still never scored, gauged or coloured, but a derived level about the role may sit on a range. The two read-only treatments side by side.
          </>
        }>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <Example label="BehaviourRating, read-only" note="A candidate's band: current filled, others outlined" tone="surface">
            <BehaviourRating name="rating-example" value="demonstrated" readOnly />
          </Example>
          <Example label="LevelMeter" note="A role's level: marker on a range" tone="surface">
            <LevelMeter label="AI fluency for this role" bands={bands} value="medium" />
          </Example>
        </div>

        <Example label="Progress: a quantity against a total" className="mt-3" tone="surface">
          <Progress label="Scenario units written" value={2} max={3} valueText="2 of 3" />
        </Example>
      </DocSection>
    </>);

}
