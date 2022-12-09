import { MemoryRouter } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

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
    <MemoryRouter initialEntries={[path]}>
      <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={ArbeidsgiverStatus.Successfully} baseUrl=''>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </MemoryRouter>
  );

  it('should show default', () => {
    act(() => {
      render(makeRoute('/'), container);
    });
    expect(container.textContent).toContain('Skjema for gravide og kronisk syke');
  });

  it('should show token fornyet', () => {
    act(() => {
      render(makeRoute('/token-fornyet'), container);
    });
    expect(container.textContent).toContain('TOKEN_FORNYET_SIDETITTEL');
  });

  it('should show gravid søknad', () => {
    act(() => {
      render(makeRoute('/gravid/soknad'), container);
    });
    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid søknad when no arbeidsgivere', () => {
    act(() => {
      render(makeRoute('/gravid/soknad', []), container);
    });
    expect(container.textContent).toContain('GRAVID_SIDE_TITTEL');
    expect(container.textContent).toContain('GRAVID_SIDE_UNDERTITTEL');
  });

  it('should show gravid kvittering', () => {
    act(() => {
      render(makeRoute('/gravid/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain('GRAVIDKVITTERINGTITTEL'); //textContent inneholder bare tekst. Ikke f.eks _ pga oversetter komponenten.
  });

  it('should show kronisk søknad', () => {
    act(() => {
      render(makeRoute('/kronisk/soknad'), container);
    });
    expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
  });
  it('should show kronisk søknad when no arbeidsgivere', () => {
    act(() => {
      render(makeRoute('/kronisk/soknad', []), container);
    });
    expect(container.textContent).toContain('KRONISK_SIDE_SIDETITTEL');
  });
  it('should show kronisk kvittering', () => {
    act(() => {
      render(makeRoute('/kronisk/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain(
      'Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom'
    );
  });

  it('should show gravid krav', () => {
    act(() => {
      render(makeRoute('/gravid/krav'), container);
    });
    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_STOR');
    expect(container.textContent).toContain('GRAVID_KRAV_SIDETITTEL_SUBTITLE');
  });
  it('should show gravid krav kvittering', () => {
    act(() => {
      render(makeRoute('/gravid/krav/kvittering'), container);
    });
    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });

  it('should show kronisk krav', () => {
    act(() => {
      render(makeRoute('/kronisk/krav'), container);
    });
    expect(container.textContent).toContain('KRONISK_KRAV_SUBTITLE');
    expect(container.textContent).toContain('KRONISK_KRAV_TITLE');
  });
  it('should show kronisk krav kvittering', () => {
    act(() => {
      render(makeRoute('/kronisk/krav/kvittering'), container);
    });
    expect(container.textContent).toContain('KRAV_KVITTERING_TITTEL');
  });
});
