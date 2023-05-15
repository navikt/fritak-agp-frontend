/**
 * @jest-environment jsdom
 */
import React from 'react';
import Side, { showChildren } from './Side';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
// import mockHistory from '../../../mock/mockHistory';
import ArbeidsgiverStatus from '../../../context/arbeidsgiver/ArbeidsgiverStatus';
import { ArbeidsgiverProvider } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import { act, render, screen } from '@testing-library/react';

// const IKKE_RETTIGHETER = 'INGENTILGANG_RETTIGHETER';
// const INGENTILGANGADVARSEL = 'INGENTILGANGADVARSEL';
const BARNE_NODER = 'barnenoder';
const ARBEIDSGIVERE: Array<Organisasjon> = [{ Name: '' } as Organisasjon];
const UTEN_ARBEIDSGIVERE: Array<Organisasjon> = [];
// const SOKNAD_TITTEL = 'soknadtittel';
const initHistory = ['/'];

const buildSide = (
  required: boolean,
  arbeidsgivere: Array<Organisasjon>,
  status: ArbeidsgiverStatus,
  title: string
) => {
  return (
    <MemoryRouter initialEntries={initHistory}>
      <ArbeidsgiverProvider baseUrl='' arbeidsgivere={arbeidsgivere} status={status}>
        <Side bedriftsmeny={required} sidetittel='Skjema' title={title} subtitle=''>
          {BARNE_NODER}
        </Side>
      </ArbeidsgiverProvider>
    </MemoryRouter>
  );
};

describe('Side', () => {
  it('should show advarsel - required and not arbeidsgivere', () => {
    act(() => {
      render(buildSide(true, UTEN_ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, 'SØKNADSSKJEMA'));
    });
    expect(screen.queryByText(BARNE_NODER)).not.toBeInTheDocument();
    expect(screen.getByText(/INGEN/)).toBeInTheDocument();
  });

  it('should show children - required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(true, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, 'SØKNADSSKJEMA'));
    });
    expect(screen.queryByText(/INGEN/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show children - not required and empty arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, UTEN_ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, 'SØKNADSSKJEMA'));
    });

    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show children - not required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, 'SØKNADSSKJEMA'));
    });

    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should not show SoknadTittel', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, ''));
    });

    expect(screen.queryByText(/SOKNAD_TITTEL/)).not.toBeInTheDocument();
    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show SoknadTittel', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully, 'TITTELEN'));
    });

    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
    expect(screen.getByText(/TITTELEN/)).toBeInTheDocument();
  });

  it('should ikke vise barn', () => {
    expect(showChildren(true, UTEN_ARBEIDSGIVERE)).toBe(false);
  });

  it('should vise barna', () => {
    expect(showChildren(true, ARBEIDSGIVERE)).toBe(true);
  });
});
