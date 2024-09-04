import React from 'react';
import { useTranslation } from 'react-i18next';
import Oversettelse from '../Oversettelse/Oversettelse';
import { BekreftOpplysningerKeys } from './BekreftOpplysningerKeys';
import { Box, ConfirmationPanel, Panel } from '@navikt/ds-react';

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
    <Box padding='4' borderRadius='small' className='bekreft-opplysninger-panel'>
      <ConfirmationPanel
        label={t(labelKey)}
        checked={checked}
        error={feil}
        onChange={onChange}
        id='bekreftFeilmeldingId'
      >
        <Oversettelse langKey={textKey} />
      </ConfirmationPanel>
    </Box>
  );
};

export default BekreftOpplysningerPanel;
