import { render, screen } from '@testing-library/react';
import React from 'react';
import GravidSoknadView from './GravidSoknadView';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';

describe('GravidSoknadView', () => {
  const notifikasjon = {
    virksomhetsnummer: '123___987',
    tilrettelegge: true,
    tiltak: ['HJEMMEKONTOR', 'TILPASSEDE_ARBEIDSOPPGAVER', 'TILPASSET_ARBEIDSTID', 'ANNET'],
    tiltakBeskrivelse: 'personlig beskrivelse av tiltaket her',
    omplassering: 'JA',
    omplasseringAarsak: 'det bare var slik',
    harVedlegg: true,
    sendtAv: 'Ole Normann'
  } as GravidSoknadResponse;

  it('should show all fields', () => {
    render(<GravidSoknadView gravidSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/123___987/)).toBeInTheDocument();
    expect(screen.getByText(/Tilrettelegging av arbeidsdagen /)).toBeInTheDocument();
    expect(screen.getByText(/hjemmekontor/)).toBeInTheDocument();
    expect(screen.getByText(/tilpassede arbeidsoppgaver/)).toBeInTheDocument();
    expect(screen.getByText(/tilpasset arbeidstid/)).toBeInTheDocument();
    expect(screen.getByText(/annet/)).toBeInTheDocument();
    expect(screen.getByText(/personlig beskrivelse av tiltaket her/)).toBeInTheDocument();
    expect(screen.getByText(/tilpassede arbeidsoppgaver/)).toBeInTheDocument();
    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
