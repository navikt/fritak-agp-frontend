import Panel from 'nav-frontend-paneler';
import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';

interface BekreftOpplysningerPanelProps {
  checked: boolean;
  onChange: () => void;
  feil: string | undefined;
}

const BekreftOpplysningerPanel = (props: BekreftOpplysningerPanelProps) => {
  const { t } = useTranslation();

  return (
    <Panel>
      <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
        <BekreftCheckboksPanel
          label={t(LangKey.BEKREFT_OPPLYSNINGER_OVERSKRIFT)}
          checked={props.checked}
          feil={props.feil}
          onChange={props.onChange}
        >
          {t(LangKey.BEKREFT_OPPLYSNINGER_BESKRIVELSE)}
        </BekreftCheckboksPanel>
      </SkjemaGruppe>
    </Panel>
  );
};

export default BekreftOpplysningerPanel;
