import React from 'react';
import { Application } from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import testOrganisasjoner from './mockData/testOrganisasjoner';
import { ArbeidsgiverStatus } from './context/ArbeidsgiverContext';
import { LoginStatus } from './context/login/LoginStatus';

describe('App', () => {
  let container = document.createElement('div');
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  const ARBEIDSGIVERE = testOrganisasjoner;
  const INGEN_ARBEIDSGIVERE = [];
  const APPLICATION_ROUTES = 'application-routes';
  const LOGIN_REDIRECT = 'login-redirect';
  const SPINNER = 'login-provider-checking';

  it('should show spinner while loading expiry', () => {
    act(() => {
      render(makeRouter('/', ArbeidsgiverStatus.NotStarted, LoginStatus.Checking, INGEN_ARBEIDSGIVERE), container);
    });
    expect(container).toContainHTML(SPINNER);
    expect(container).not.toContainHTML(LOGIN_REDIRECT);
    expect(container).not.toContainHTML(APPLICATION_ROUTES);
  });

  it('should redirect when not logged in', async () => {
    act(() => {
      render(makeRouter('/', ArbeidsgiverStatus.NotStarted, LoginStatus.MustLogin, INGEN_ARBEIDSGIVERE), container);
    });
    // expect(container).not.toContain(SPINNER);
    expect(container).toContainHTML(LOGIN_REDIRECT);
    // expect(container).not.toContain(APPLICATION_ROUTES);
  });

  it('should prevent infinite loop', () => {
    act(() => {
      render(makeRouter('/', ArbeidsgiverStatus.NotStarted, LoginStatus.MustLogin, INGEN_ARBEIDSGIVERE), container);
    });
    expect(container).not.toContainHTML(SPINNER);
    expect(container).toContainHTML(LOGIN_REDIRECT);
    expect(container).not.toContainHTML(APPLICATION_ROUTES);
  });

  it('should show ApplicationRoutes when logged in', () => {
    act(() => {
      render(makeRouter('/', ArbeidsgiverStatus.Successfully, LoginStatus.Verified, ARBEIDSGIVERE), container);
    });
    expect(container).not.toContainHTML(SPINNER);
    expect(container).not.toContainHTML(LOGIN_REDIRECT);
    expect(container).toContainHTML(APPLICATION_ROUTES);
  });

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };
  const makeRouter = (
    path: string,
    status: ArbeidsgiverStatus,
    loginStatus: LoginStatus,
    arbeidsgivere: Array<Organisasjon>
  ) => {
    return (
      <Router history={makeHistory(path)}>
        <Application arbeidsgiverStatus={status} loginStatus={loginStatus} arbeidsgivere={arbeidsgivere} />
      </Router>
    );
  };
});
