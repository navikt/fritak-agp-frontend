import { render, screen } from '@testing-library/react';
import React from 'react';
import KroniskSoknadView from './KroniskSoknadView';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';

describe('KroniskSoknadView', () => {
  const notifikasjon = {
    virksomhetsnavn: 'Ola Normann',
    fravaer: [{}],
    harVedlegg: true,
    sendtAvNavn: 'Ole Normann'
  } as KroniskSoknadResponse;

  it('should show all fields', () => {
    render(<KroniskSoknadView kroniskSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/Ola Normann/)).toBeInTheDocument();

    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
