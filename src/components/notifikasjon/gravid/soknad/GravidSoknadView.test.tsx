import { render, screen } from '@testing-library/react';
import React from 'react';
import GravidSoknadView from './GravidSoknadView';
import { GravidSoknadResponse } from '../../../../api/gravid/GravidSoknadResponse';

describe('GravidSoknadView', () => {
  const notifikasjon = {
    virksomhetsnavn: 'Kari Normann',
    tilrettelegge: true,
    tiltak: ['HJEMMEKONTOR', 'TILPASSEDE_ARBEIDSOPPGAVER', 'TILPASSET_ARBEIDSTID', 'ANNET'],
    tiltakBeskrivelse: 'personlig beskrivelse av tiltaket her',
    omplassering: 'JA',
    omplasseringAarsak: 'det bare var slik',
    harVedlegg: true,
    sendtAvNavn: 'Ole Normann'
  } as GravidSoknadResponse;

  it('should show all fields', () => {
    render(<GravidSoknadView gravidSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/Kari Normann/)).toBeInTheDocument();
    expect(screen.getByText(/Tilrettelegging av arbeidsdagen /)).toBeInTheDocument();
    expect(screen.getByText(/Hjemmekontor/)).toBeInTheDocument();
    expect(screen.getByText(/Tilpassede arbeidsoppgaver/)).toBeInTheDocument();
    expect(screen.getByText(/Tilpasset arbeidstid/)).toBeInTheDocument();
    expect(screen.getByText(/Annet/)).toBeInTheDocument();
    expect(screen.getByText(/personlig beskrivelse av tiltaket her/)).toBeInTheDocument();
    expect(screen.getByText(/Tilpassede arbeidsoppgaver/)).toBeInTheDocument();
    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
