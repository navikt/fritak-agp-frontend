import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  const makeRoute = (path: string) => (
    <Router history={makeHistory(path)}>
      <ArbeidsgiverProvider arbeidsgivere={[]} status={Status.Successfully}>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </Router>
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
    expect(container.textContent).toContain('Innloggingen er fornyet');
  });

  it('should show gravid søknad', () => {
    act(() => {
      render(makeRoute('/gravid/soknad'), container);
    });
    expect(container.textContent).toContain('GRAVID ANSATT');
    expect(container.textContent).toContain('Søknad om at NAV dekker sykepenger i arbeidsgiverperioden');
  });
  it('should show gravid kvittering', () => {
    act(() => {
      render(makeRoute('/gravid/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain('Søknaden er mottatt');
  });

  it('should show kronisk søknad', () => {
    act(() => {
      render(makeRoute('/kronisk/soknad'), container);
    });
    expect(container.textContent).toContain('KRONISK ELLER LANGVARIG SYKDOM');
  });
  it('should show kronisk kvittering', () => {
    act(() => {
      render(makeRoute('/kronisk/soknad/kvittering'), container);
    });
    expect(container.textContent).toContain('Kravet er mottatt');
  });

  it('should show gravid krav', () => {
    act(() => {
      render(makeRoute('/gravid/krav'), container);
    });
    expect(container.textContent).toContain('Kravskjema');
    expect(container.textContent).toContain('GRAVID ANSATT');
  });
  it('should show gravid krav kvittering', () => {
    act(() => {
      render(makeRoute('/gravid/krav/kvittering'), container);
    });
    expect(container.textContent).toContain('Søknaden er mottatt');
  });
});
