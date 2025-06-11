/**
 * @vi-environment jsdom
 */
import React from 'react';
import Side, { showChildren } from './Side';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import { ArbeidsgiverProvider } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import { act, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';
import HttpStatus from '../../../api/HttpStatus';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

const BARNE_NODER = 'barnenoder';
const ARBEIDSGIVERE: Array<Organisasjon> = [
  {
    navn: 'Test',
    orgnr: '123456789',
    underenheter: [{ navn: 'Test', orgnr: '123456789', underenheter: [] }]
  } as Organisasjon
];
const UTEN_ARBEIDSGIVERE: Array<Organisasjon> = [];
const initHistory = ['/'];

const buildSide = (required: boolean, arbeidsgivere: Array<Organisasjon>, status: HttpStatus, title: string) => {
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
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = vi.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    });
  });

  it('should show advarsel - required and not arbeidsgivere', () => {
    act(() => {
      render(buildSide(true, UTEN_ARBEIDSGIVERE, HttpStatus.Successfully, 'SØKNADSSKJEMA'));
    });
    expect(screen.queryByText(BARNE_NODER)).not.toBeInTheDocument();
    expect(screen.getByText(/INGEN/)).toBeInTheDocument();
  });

  it('should show children - required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(true, ARBEIDSGIVERE, HttpStatus.Successfully, 'SØKNADSSKJEMA'));
    });
    expect(screen.queryByText(/INGEN/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show children - not required and empty arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, UTEN_ARBEIDSGIVERE, HttpStatus.Successfully, 'SØKNADSSKJEMA'));
    });

    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show children - not required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, HttpStatus.Successfully, 'SØKNADSSKJEMA'));
    });

    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should not show SoknadTittel', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, HttpStatus.Successfully, ''));
    });

    expect(screen.queryByText(/SOKNAD_TITTEL/)).not.toBeInTheDocument();
    expect(screen.queryByText(/IKKE_RETTIGHETER/)).not.toBeInTheDocument();
    expect(screen.getByText(BARNE_NODER)).toBeInTheDocument();
  });

  it('should show SoknadTittel', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, HttpStatus.Successfully, 'TITTELEN'));
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
