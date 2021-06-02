import { Router } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import mockHistory from './mockData/mockHistory';
import { ArbeidsgiverProvider } from './context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from './context/arbeidsgiver/ArbeidsgiverStatus';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str
      }
    };
  }
}));

describe('ApplicationRoutes', () => {
  let container = document.createElement('div');

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  const makeRoute = (path: string, arbeidsgivere: Array<Organisasjon> = [{ Name: '' } as Organisasjon]) => (
    <Router history={mockHistory(path)}>
      <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={ArbeidsgiverStatus.Successfully} baseUrl=''>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </Router>
  );

  it('should show default', () => {
    act(() => {
      render(makeRoute('/nb'), container);
    });
    expect(container.textContent).toContain('Skjema for gravide og kronisk syke');
  });

  it('should show token fornyet', () => {
    act(() => {
      render(makeRoute('/nb/token-fornyet'), container);
    });
    expect(container.textContent).toContain('TOKEN_FORNYET_INNHOLDSTITTEL');
  });

  it('should show gravid søknad', () => {
    act(() => {
      render(makeRoute('/nb/gravid/soknad'), container);
    });
    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid søknad when no arbeidsgivere', () => {
    act(() => {
      render(makeRoute('/nb/gravid/soknad', []), container);
    });
    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid kvittering', () => {
    act(() => {
      render(makeRoute('/nb/gravid/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain('GRAVIDKVITTERINGTITTEL'); //textContent inneholder bare tekst. Ikke f.eks _ pga oversetter komponenten.
  });

  it('should show kronisk søknad', () => {
    act(() => {
      render(makeRoute('/nb/kronisk/soknad'), container);
    });
    expect(container.textContent).toContain('KRONISK ELLER LANGVARIG SYKDOM');
  });
  it('should show kronisk søknad when no arbeidsgivere', () => {
    act(() => {
      render(makeRoute('/nb/kronisk/soknad', []), container);
    });
    expect(container.textContent).toContain('KRONISK ELLER LANGVARIG SYKDOM');
  });
  it('should show kronisk kvittering', () => {
    act(() => {
      render(makeRoute('/nb/kronisk/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain('Søknaden er mottatt');
  });

  it('should show gravid krav', () => {
    act(() => {
      render(makeRoute('/nb/gravid/krav'), container);
    });
    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_STOR');
    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_SUBTITLE');
  });
  it('should show gravid krav kvittering', () => {
    act(() => {
      render(makeRoute('/nb/gravid/krav/kvittering'), container);
    });
    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });

  it('should show kronisk krav', () => {
    act(() => {
      render(makeRoute('/nb/kronisk/krav'), container);
    });
    expect(container.textContent).toContain('KRONISK ELLER LANGVARIG SYK ANSATT');
    expect(container.textContent).toContain('Krav om refusjon av sykepenger i arbeidsgiverperioden');
  });
  it('should show kronisk krav kvittering', () => {
    act(() => {
      render(makeRoute('/nb/kronisk/krav/kvittering'), container);
    });
    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });
});
