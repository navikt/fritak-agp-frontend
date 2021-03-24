import Panel from 'nav-frontend-paneler';
import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';

interface BekreftOpplysningerPanelProps {
  checked: boolean;
  onChange: () => void;
  feil: string | undefined;
}

const BekreftOpplysningerPanel = (props: BekreftOpplysningerPanelProps) => {
  return (
    <Panel>
      <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
        <BekreftCheckboksPanel
          label='Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.'
          checked={props.checked}
          feil={props.feil}
          onChange={props.onChange}
        >
          Jeg vet at NAV kan trekke tilbake retten til å få dekket sykepengene i arbeidsgiverperioden hvis opplysningene
          ikke er riktige eller fullstendige.
        </BekreftCheckboksPanel>
      </SkjemaGruppe>
    </Panel>
  );
};

export default BekreftOpplysningerPanel;
