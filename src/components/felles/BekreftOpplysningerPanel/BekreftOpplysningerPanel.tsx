import React from 'react';
import { useTranslation } from 'react-i18next';
import Oversettelse from '../Oversettelse/Oversettelse';
import { BekreftOpplysningerKeys } from './BekreftOpplysningerKeys';
import { Box, Checkbox, CheckboxGroup } from '@navikt/ds-react';

interface BekreftOpplysningerPanelProps {
  checked: boolean;
  onChange: () => void;
  feil?: string;
  labelKey?: string;
  textKey?: string;
  textOverskriftKey?: string;
}

const BekreftOpplysningerPanel = ({
  checked,
  onChange,
  feil,
  labelKey = BekreftOpplysningerKeys.LABEL,
  textKey = BekreftOpplysningerKeys.OPPLYSNINGER,
  textOverskriftKey = BekreftOpplysningerKeys.OPPLYSNINGER_OVERSKRIFT
}: BekreftOpplysningerPanelProps) => {
  const { t } = useTranslation();

  return (
    <Box padding='space-4' borderRadius='2' className='bekreft-opplysninger-panel'>
      <Oversettelse langKey={textKey} />
      <CheckboxGroup legend={t(textOverskriftKey)} error={feil} hideLegend>
        <Checkbox
          value='bekreftFeilmeldingId'
          id='bekreftFeilmeldingId'
          checked={checked}
          onChange={onChange}
          error={!!feil}
        >
          {t(labelKey)}
        </Checkbox>
      </CheckboxGroup>
    </Box>
  );
};

export default BekreftOpplysningerPanel;
