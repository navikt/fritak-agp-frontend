import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Oversettelse from '../Oversettelse/Oversettelse';
import { BekreftOpplysningerKeys } from './BekreftOpplysningerKeys';
import { ConfirmationPanel, Panel } from '@navikt/ds-react';

interface BekreftOpplysningerPanelProps {
  checked: boolean;
  onChange: () => void;
  feil?: string;
  labelKey?: string;
  textKey?: string;
}

const BekreftOpplysningerPanel = ({
  checked,
  onChange,
  feil,
  labelKey = BekreftOpplysningerKeys.LABEL,
  textKey = BekreftOpplysningerKeys.OPPLYSNINGER
}: BekreftOpplysningerPanelProps) => {
  const { t } = useTranslation();

  return (
    <Panel className='bekreft-opplysninger-panel'>
      <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
        <ConfirmationPanel label={t(labelKey)} checked={checked} error={feil} onChange={onChange}>
          <Oversettelse langKey={textKey} />
        </ConfirmationPanel>
      </SkjemaGruppe>
    </Panel>
  );
};

export default BekreftOpplysningerPanel;
