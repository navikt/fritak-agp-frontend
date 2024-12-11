import { MemoryRouter } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { render } from '@testing-library/react';
import { ArbeidsgiverProvider } from './context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from './context/arbeidsgiver/ArbeidsgiverStatus';
import { Organisasjon } from '@navikt/bedriftsmeny';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('ApplicationRoutes', () => {
  const makeRoute = (path: string, arbeidsgivere: Array<Organisasjon> = [{ Name: '' } as Organisasjon]) => (
    <MemoryRouter initialEntries={[path]}>
      <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={ArbeidsgiverStatus.Successfully} baseUrl=''>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </MemoryRouter>
  );

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

  it('should show default', () => {
    const { container } = render(makeRoute('/'));

    expect(container.textContent).toContain('Skjema for gravide og kronisk syke');
  });

  it('should show token fornyet', () => {
    const { container } = render(makeRoute('/token-fornyet'));

    expect(container.textContent).toContain('TOKEN_FORNYET_SIDETITTEL');
  });

  it('should show gravid søknad', () => {
    const { container } = render(makeRoute('/gravid/soknad'));

    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid søknad when no arbeidsgivere', () => {
    const { container } = render(makeRoute('/gravid/soknad', []));

    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid kvittering', () => {
    const { container } = render(makeRoute('/gravid/soknad/kvittering'));

    expect(container.textContent).toContain('GRAVIDKVITTERINGTITTEL'); //textContent inneholder bare tekst. Ikke f.eks _ pga oversetter komponenten.
  });

  it('should show kronisk søknad', () => {
    const { container } = render(makeRoute('/kronisk/soknad'));

    expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
  });
  it('should show kronisk søknad when no arbeidsgivere', () => {
    const { container } = render(makeRoute('/kronisk/soknad', []));

    expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
  });
  it('should show kronisk kvittering', () => {
    const { container } = render(makeRoute('/kronisk/soknad/kvittering'));

    expect(container.textContent).toContain(
      'Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom'
    );
  });

  it('should show gravid krav', () => {
    const { container } = render(makeRoute('/gravid/krav'));

    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_STOR');
    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_SUBTITLE');
  });
  it('should show gravid krav kvittering', () => {
    const { container } = render(makeRoute('/gravid/krav/kvittering'));

    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });

  it('should show kronisk krav', () => {
    const { container } = render(makeRoute('/kronisk/krav'));

    expect(container.textContent).toContain('KRONISK_KRAV_SUBTITLE');
    expect(container.textContent).toContain('KRONISK_KRAV_TITLE');
  });
  it('should show kronisk krav kvittering', () => {
    const { container } = render(makeRoute('/kronisk/krav/kvittering'));

    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });
});
