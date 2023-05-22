import React from 'react';
import InnloggetSide from './InnloggetSide';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from '../../../context/arbeidsgiver/ArbeidsgiverStatus';
import testOrganisasjoner from '../../../mock/testOrganisasjoner';
import { act, render, screen } from '@testing-library/react';

describe('InnloggetSide', () => {
  it('skal kun vise feilmelding dersom man ikke har rettigheter', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
            <InnloggetSide sideTittel={'Sidetittel'}>Barna</InnloggetSide>
          </ArbeidsgiverProvider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/INGEN/)).toBeInTheDocument();
    expect(screen.queryByText(/INNLOGGET_SIDE_MIN_SIDE/)).not.toBeInTheDocument();
    expect(screen.queryByText('Barna')).not.toBeInTheDocument();
  });

  it('skal vise innhold dersom man har rettigheter', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <ArbeidsgiverProvider
            arbeidsgivere={testOrganisasjoner}
            status={ArbeidsgiverStatus.Successfully}
            baseUrl={''}
          >
            <InnloggetSide sideTittel={'InnloggetSideTittel'}>Barna</InnloggetSide>
          </ArbeidsgiverProvider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByText(/INGEN/)).not.toBeInTheDocument();
    expect(screen.getByText(/INNLOGGET_SIDE_MIN_SIDE/)).toBeInTheDocument();
    expect(screen.getByText('Barna')).toBeInTheDocument();
  });
});
