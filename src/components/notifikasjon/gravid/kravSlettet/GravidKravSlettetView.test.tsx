import { render, screen } from '@testing-library/react';
import React from 'react';
import GravidKravSlettetView from './GravidKravSlettetView';
import { GravidSoknadResponse } from '../../../../api/gravid/GravidSoknadResponse';
import GravidKravVisning from '../../../../api/gravidkrav/GravidKravVisning';

describe('GravidSoknadView', () => {
  const notifikasjon = {
    id: '1',
    opprettet: '2021-06-01T12:00:00',
    sendtAv: 'Ole Normann',
    virksomhetsnummer: '123456789',
    virksomhetsnavn: 'Kari Normann',
    tilrettelegge: true,
    identitetsnummer: '12345678910',
    perioder: [
      {
        fom: '2021-06-01',
        tom: '2021-06-30',
        antallDagerMedRefusjon: 20,
        belop: 1234
      }
    ],
    totalBelop: 1234,
    harVedlegg: true,
    antallDager: 20,
    journalpostId: '123',
    oppgaveId: '123'
  } as GravidKravVisning;

  it('should show all fields', () => {
    render(<GravidKravSlettetView gravidKravVisning={notifikasjon} />);
    expect(screen.getAllByText(/Kari Normann/).length).toBe(2);
    expect(screen.getByText(/Kari Normann har slettet et krav./)).toBeInTheDocument();
    expect(screen.getByText(/01.06.21/)).toBeInTheDocument();
    expect(screen.getByText(/30.06.21/)).toBeInTheDocument();
  });
});
