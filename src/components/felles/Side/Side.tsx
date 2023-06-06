import React from 'react';
import { Container } from 'nav-frontend-grid';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useTranslation } from 'react-i18next';
import { IngenTilgangAdvarsel } from '../login/IngenTilgangAdvarsel';
import { useArbeidsgiver } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import { SideKeys } from './SideKeys';
import './Side.sass';
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
      <Bedriftsmeny
        onOrganisasjonChange={(org: Organisasjon) => {
          setArbeidsgiverId(org.OrganizationNumber);
          setFirma(org.Name);
        }}
        sidetittel={props.sidetittel}
        organisasjoner={props.bedriftsmeny ? arbeidsgivere : []}
      />

      <main className={'side ' + props.className}>
        {!props.skjulTilbakeLenke && (
          <Container className='side__breadcrumb'>
            <div className='side__minside_arbeidsgiver'>
              <Link href={env.minSideArbeidsgiver}>&lt;&lt; {t(SideKeys.SIDE_MIN_SIDE_ARBEIDSGIVER)}</Link>
            </div>
          </Container>
        )}

        <Container className={'side__innhold'}>
          <div>
            <div>
              {props.title && <SoknadTittel subtitle={props.subtitle}>{props.title}</SoknadTittel>}

              <SideIndentering>
                {showChildren(props.bedriftsmeny, arbeidsgivere) && props.children}
                {!showChildren(props.bedriftsmeny, arbeidsgivere) && <IngenTilgangAdvarsel />}
              </SideIndentering>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export const showChildren = (bedriftsmeny: boolean | undefined, arbeidsgivere: Array<Organisasjon>) => {
  return bedriftsmeny === false || arbeidsgivere.length > 0;
};

export default Side;
