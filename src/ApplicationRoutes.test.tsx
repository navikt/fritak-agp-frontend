import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import React from 'react';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { render, screen } from '@testing-library/react';

describe('ApplicationRoutes', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  const makeRoute = (path: string) => (
    <Router history={makeHistory(path)}>
      <ArbeidsgiverProvider status={200} arbeidsgivere={[{}]}>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </Router>
  );

  const makeRender = (path: string) => render(makeRoute(path));

  it('should show default', () => {
    makeRender('/');
    expect(screen.getByText('Skjema for gravide og kronisk syke'));
  });

  it('should show token fornyet', () => {
    makeRender('/token-fornyet');
    expect(screen.getByText('Innloggingen er fornyet'));
  });

  it('should show gravid søknad', () => {
    makeRender('/gravid/soknad');
    expect(screen.getByText('GRAVID ANSATT'));
    expect(screen.getByText('Søknad om at NAV dekker sykepenger i arbeidsgiverperioden'));
  });
  it('should show gravid kvittering', () => {
    makeRender('/gravid/soknad/kvittering');
    expect(screen.getByText('Søknaden er mottatt'));
  });

  it('should show kronisk søknad', () => {
    makeRender('/kronisk/soknad');
    expect(screen.getByText('KRONISK ELLER LANGVARIG SYKDOM'));
  });
  it('should show kronisk kvittering', () => {
    makeRender('/kronisk/soknad/kvittering');
    expect(screen.getByText('Kravet er mottatt'));
  });

  it('should show gravid krav', () => {
    makeRender('/gravid/krav');
    // expect(screen.getByText('GRAVID ANSATT'))
    // expect(screen.getByText('Kravskjema'))
  });
  it('should show gravid krav kvittering', () => {
    makeRender('/gravid/krav/kvittering');
    expect(screen.getByText('Søknaden er mottatt'));
  });
});
