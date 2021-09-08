import { render, screen } from '@testing-library/react';
import React from 'react';
import NotifikasjonInnhold from './NotifikasjonInnhold';
import NotifikasjonType from './NotifikasjonType';

describe('NotifikasjonInnhold', () => {
  const buildNotifikasjon = () => (
    <NotifikasjonInnhold title='TITTELEN' type={NotifikasjonType.GravidSoknad} dato='2021-02-22T11:03:50.710556'>
      <h6>Barna</h6>
    </NotifikasjonInnhold>
  );

  it('should show path', () => {
    render(buildNotifikasjon());
    expect(screen.getByText(/Ditt NAV/)).toBeInTheDocument();
  });

  it('should show header', () => {
    render(buildNotifikasjon());
    expect(screen.getByText(/TITTELEN/)).toBeInTheDocument();
    expect(screen.getByText(/22.02.2021/)).toBeInTheDocument();
  });

  it('should show children', () => {
    render(buildNotifikasjon());
    expect(screen.getByText(/Barna/)).toBeInTheDocument();
  });
});
