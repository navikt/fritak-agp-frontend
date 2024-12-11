import { render, screen } from '@testing-library/react';
import React from 'react';
import KroniskSoknadView from './KroniskSoknadView';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('KroniskSoknadView', () => {
  const notifikasjon = {
    virksomhetsnavn: 'Ola Normann',
    fravaer: [{}],
    harVedlegg: true,
    sendtAvNavn: 'Ole Normann'
  } as KroniskSoknadResponse;

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

  it('should show all fields', () => {
    render(<KroniskSoknadView kroniskSoknadResponse={notifikasjon} />);
    expect(screen.getByText(/Ola Normann/)).toBeInTheDocument();

    expect(screen.getByText(/Dokumentasjon vedlagt/)).toBeInTheDocument();
    expect(screen.getByText(/Ole Normann/)).toBeInTheDocument();
  });
});
