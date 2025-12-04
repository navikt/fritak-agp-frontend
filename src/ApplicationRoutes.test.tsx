import { MemoryRouter } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ArbeidsgiverProvider } from './context/arbeidsgiver/ArbeidsgiverContext';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';
import HttpStatus from './api/HttpStatus';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('ApplicationRoutes', () => {
  const makeRoute = (
    path: string,
    arbeidsgivere: Array<Organisasjon> = [
      {
        navn: 'navn',
        orgnr: '123456789',
        underenheter: [{ navn: 'navn', orgnr: '123456789', underenheter: [] }]
      } as Organisasjon
    ]
  ) => (
    <MemoryRouter initialEntries={[path]}>
      <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={HttpStatus.Successfully} baseUrl=''>
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

  it('should show default', async () => {
    const { container } = render(makeRoute('/'));

    await waitFor(() => {
      expect(container.textContent).toContain('Skjema for gravide og kronisk syke');
    });
  });

  it('should show token fornyet', async () => {
    const { container } = render(makeRoute('/token-fornyet'));

    await waitFor(() => {
      expect(container.textContent).toContain('TOKEN_FORNYET_SIDETITTEL');
    });
  });

  it('should show gravid søknad', async () => {
    const { container } = render(makeRoute('/gravid/soknad'));

    await waitFor(() => {
      expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
      expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
    });
  });

  it('should show gravid søknad when no arbeidsgivere', async () => {
    const { container } = render(makeRoute('/gravid/soknad', []));

    await waitFor(() => {
      expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
      expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
    });
  });

  it('should show gravid kvittering', async () => {
    const { container } = render(makeRoute('/gravid/soknad/kvittering'));

    await waitFor(() => {
      expect(container.textContent).toContain('GRAVIDKVITTERINGTITTEL'); //textContent inneholder bare tekst. Ikke f.eks _ pga oversetter komponenten.
    });
  });

  it('should show kronisk søknad', async () => {
    const { container } = render(makeRoute('/kronisk/soknad'));

    await waitFor(() => {
      expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
    });
  });
  it('should show kronisk søknad when no arbeidsgivere', async () => {
    const { container } = render(makeRoute('/kronisk/soknad', []));

    await waitFor(() => {
      expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
    });
  });
  it('should show kronisk kvittering', async () => {
    const { container } = render(makeRoute('/kronisk/soknad/kvittering'));

    await waitFor(() => {
      expect(container.textContent).toContain(
        'Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom'
      );
    });
  });

  it('should show gravid krav', async () => {
    const { container } = render(makeRoute('/gravid/krav'));

    await waitFor(
      () => {
        expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_STOR');
        expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_SUBTITLE');
      },
      { timeout: 10000 }
    );
  });
  it('should show gravid krav kvittering', async () => {
    const { container } = render(makeRoute('/gravid/krav/kvittering'));

    await waitFor(() => {
      expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
    });
  });

  it('should show kronisk krav', async () => {
    const { container } = render(makeRoute('/kronisk/krav'));

    await waitFor(
      () => {
        expect(container.textContent).toContain('KRONISK_KRAV_SUBTITLE');
        expect(container.textContent).toContain('KRONISK_KRAV_TITLE');
      },
      { timeout: 10000 }
    );
  });
  it('should show kronisk krav kvittering', async () => {
    const { container } = render(makeRoute('/kronisk/krav/kvittering'));

    await waitFor(() => {
      expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
    });
  });
});
