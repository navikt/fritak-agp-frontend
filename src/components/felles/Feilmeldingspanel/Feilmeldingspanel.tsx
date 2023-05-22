import React from 'react';
import { useTranslation } from 'react-i18next';
import { FeilmeldingspanelKeys } from './FeilmeldingspanelKeys';
import { FeiloppsummeringFeil } from '../../../validation/mapKravFeilmeldinger';
import { ErrorSummary, Panel } from '@navikt/ds-react';

interface FeilmeldingspanelProps {
  feilmeldinger: Array<FeiloppsummeringFeil>;
}

const Feilmeldingspanel = (props: FeilmeldingspanelProps) => {
  const { t } = useTranslation();
  if (props.feilmeldinger && props.feilmeldinger.length > 0) {
    return (
      <Panel>
        <ErrorSummary heading={t(FeilmeldingspanelKeys.FEILMELDINGSPANEL)}>
          {props.feilmeldinger.map((melding) => (
            <ErrorSummary.Item href={melding.skjemaelementId} key={melding.skjemaelementId}>
              {melding.feilmelding}
            </ErrorSummary.Item>
          ))}
        </ErrorSummary>
      </Panel>
    );
  } else {
    return null;
  }
};

export default Feilmeldingspanel;
