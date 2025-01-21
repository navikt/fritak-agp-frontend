import React from 'react';
import { Banner, Virksomhetsvelger, Organisasjon } from '@navikt/virksomhetsvelger';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';
import { useTranslation } from 'react-i18next';
import { IngenTilgangAdvarsel } from '../login/IngenTilgangAdvarsel';
import { useArbeidsgiver } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import { SideKeys } from './SideKeys';
import './Side.scss';
import './SideIndentering.sass';
import { Link } from '@navikt/ds-react';
import env from '../../../config/environment';

interface SideProps {
  children: React.ReactNode;
  className?: string;
  sidetittel: string;
  title?: string;
  subtitle?: string;
  bedriftsmeny?: boolean;
  skjulTilbakeLenke?: boolean;
}

const Side = (props: SideProps) => {
  const { t } = useTranslation();
  const { arbeidsgivere, setArbeidsgiverId, setFirma } = useArbeidsgiver();

  return (
    <div className={'side ' + (props.className ? props.className : '')}>
      <Banner tittel={props.sidetittel}>
        {props.bedriftsmeny && arbeidsgivere?.length > 0 && (
          <Virksomhetsvelger
            onChange={(org: Organisasjon) => {
              setArbeidsgiverId(org.orgnr);
              setFirma(org.navn);
            }}
            organisasjoner={props.bedriftsmeny ? arbeidsgivere : []}
          />
        )}
      </Banner>

      <main className={'side ' + props.className}>
        {!props.skjulTilbakeLenke && (
          <div className='side__breadcrumb container'>
            <div className='side__minside_arbeidsgiver'>
              <Link href={env.minSideArbeidsgiver}>&lt;&lt; {t(SideKeys.SIDE_MIN_SIDE_ARBEIDSGIVER)}</Link>
            </div>
          </div>
        )}

        <div className='side__innhold container'>
          <div>
            <div>
              {props.title && <SoknadTittel subtitle={props.subtitle}>{props.title}</SoknadTittel>}

              <SideIndentering>
                {showChildren(props.bedriftsmeny, arbeidsgivere) && props.children}
                {!showChildren(props.bedriftsmeny, arbeidsgivere) && <IngenTilgangAdvarsel />}
              </SideIndentering>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const showChildren = (bedriftsmeny: boolean | undefined, arbeidsgivere: Array<Organisasjon>) => {
  return bedriftsmeny === false || arbeidsgivere.length > 0;
};

export default Side;
