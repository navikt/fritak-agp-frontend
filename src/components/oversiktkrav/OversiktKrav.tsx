import { Oversettelse, ServerFeilAdvarsel, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Column, Row } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';

export default function OversiktKrav(state) {
  const handleCloseServerFeil = () => {};

  return (
    <Side
      bedriftsmeny={true}
      className='kroniskkrav'
      sidetittel='Kravoversikt'
      title='Kravoversikt'
      subtitle='Oversikt over innsendte krav'
    >
      <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
      <Row className='kravliste'>
        <Column>
          <Innholdstittel className='kravliste-tittel'>Tidligere innsendte krav</Innholdstittel>

          {/* <ul className='kravliste-liste'>
          {props.innsendinger &&
            props.innsendinger.map((item) => (
              <li className='kravliste-krav' key={item}>
                <Lenke href='#' onClick={() => props.onKravClick(item)}>
                  {formaterIsoTimestampAsNoTime(item)} - {t(LangKey.REFUSJONSKRAV)}
                </Lenke>
              </li>
            ))}
        </ul> */}
        </Column>
      </Row>
      );
    </Side>
  );
}
