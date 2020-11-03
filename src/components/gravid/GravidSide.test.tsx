import React from 'react'
import GravidSide from './GravidSide';
import {render, unmountComponentAtNode} from 'react-dom';
import GravidStatus from './GravidStatus';
import {axe} from 'jest-axe';
import {cleanup, render as renderTestingLibrary} from '@testing-library/react';

describe('GravidSide', () => {

  let htmlDivElement: Element = document.createElement('div');

  beforeEach(() => {
    htmlDivElement = document.createElement('div');
    document.body.appendChild(htmlDivElement);
  });

  afterEach(() => {
    unmountComponentAtNode(htmlDivElement);
    htmlDivElement.remove();
    htmlDivElement = document.createElement('div');
  });

  const INFORMASJON = 'Informasjon om den ansatte';
  const FODSELSNR = 'Fødselsnummer';
  const TERMINDATO = 'Termindato';
  const TILRETTELEGGE = 'Har dere forsøkt å tilrettelegge arbeidsdagen';
  const TILTAK = 'Hvilke tiltak er forsøkt';
  const VIDERE = 'Forsøksvis tilrettelegging er i utgangspunktet ';
  const OMPLASSERING = 'Er omplassering av den ansatte forsøkt';
  const DOKUMENTASJON = 'Dokumentasjon om svagerskapsrelatert';
  const BEKREFT = 'Jeg er kjent med at hvis opplysningene jeg har gitt ikke';
  const SEND_KNAPP = 'Send søknad';
  const STATUS_DEFAULT = 'Søknad om unntak fra arbeidsgiveransvar';
  const STATUS_VENTER = 'Vennligst vent';
  const STATUS_OK = 'Søknaden er mottatt';
  const STATUS_ERROR = 'Det oppstod en feil';

  it('skal vise kun søknadsskjema som default', () => {
    render(<GravidSide status={GravidStatus.DEFAULT}/>, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  })

  it('skal vise venteside når man venter på svar', () => {
    render(<GravidSide status={GravidStatus.IN_PROGRESS}/>, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  })

  it('skal vise kvittering når positivt svar', () => {
    render(<GravidSide status={GravidStatus.SUCCESS}/>, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  })

  it('skal vise feilmelding når svar feilet', () => {
    render(<GravidSide status={GravidStatus.ERROR}/>, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).toContain(STATUS_ERROR);
  })

  it('skal vise samtlige feilmelding når alle felter mangler', () => {
    render(<GravidSide tilrettelegge={true} validated={true} bekreftet={true}/>, htmlDivElement);
    expect(htmlDivElement.textContent).toContain('Fyll ut gyldig fødselsnummer');
    expect(htmlDivElement.textContent).toContain('Termindato må fylles ut');
    expect(htmlDivElement.textContent).toContain('Tiltak må fylles ut');
    // expect(container.textContent).toContain('Spesifiser hvilke tiltak som er forsøkt');
    expect(htmlDivElement.textContent).toContain('Velg omplassering');
    expect(htmlDivElement.textContent).toContain('Last opp dokumentasjon');
    // expect(container.textContent).toContain('Bekreft at opplysningene er korrekt');
  })

  it('skal vise fødselsnr, termindato og tilrettelegge - som default', () => {
    render(<GravidSide/>, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INFORMASJON);
    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(TERMINDATO);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(VIDERE);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  })


  // it('skal vise feilmelding for ugyldig fødselsnummer - validert', () => {
  //   render(
  //     <GravidSide fnr="123123" validated={true}/>
  //     , container
  //   );
  //   expect(container.textContent).toContain('Ugyldig fødselsnummer');
  //   expect(container.textContent).toContain('123123');
  // })
  //
  // it('skal ikke vise feilmelding for ugyldig fødselsnummer - ikke validert', () => {
  //   render(
  //     <GravidSide fnr="123" validated={false}/>
  //     , container
  //   );
  //   expect(container.textContent).not.toContain('Ugyldig fødselsnummer');
  // })

  it('skal ikke vise tiltak, omplassering, dokumentasjon, bekreft og knapp - uten at forsøk er valgt', () => {
    render(
      <GravidSide
        fnr="123"
        dato={new Date(2020, 9, 28)}
        tilrettelegge={undefined}
      />
      , htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  })

  it('skal ikke vise dokumentasjon, bekreft og knapp - før man velger å gå videre', () => {
    render(
      <GravidSide
        fnr="123"
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={false}
      />
      , htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  })

  it('skal vise dokumentasjon, bekreft og knapp - etter man har valgt å gå videre', () => {
    render(
      <GravidSide
        fnr="123"
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
      , htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).toContain(BEKREFT);
    expect(htmlDivElement.textContent).toContain(SEND_KNAPP);
  })

  it('should have no a11y violations', async () => {
    const { container } = renderTestingLibrary(<GravidSide
      fnr="123"
      dato={new Date(2020, 9, 28)}
      tilrettelegge={false}
      videre={true}
    />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

});
