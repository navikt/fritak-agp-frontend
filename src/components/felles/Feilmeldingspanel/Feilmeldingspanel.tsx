import Panel from 'nav-frontend-paneler';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import React from 'react';

interface FeilmeldingspanelProps {
  feilmeldinger: Array<FeiloppsummeringFeil>;
}

const Feilmeldingspanel = (props: FeilmeldingspanelProps) => {
  if (props.feilmeldinger && props.feilmeldinger.length > 0) {
    return (
      <Panel>
        <Feiloppsummering tittel='For å gå videre må du rette opp følgende:' feil={props.feilmeldinger} />
      </Panel>
    );
  } else {
    return null;
  }
};

export default Feilmeldingspanel;
