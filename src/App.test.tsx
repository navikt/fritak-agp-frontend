import React from 'react';
import { Application } from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Status } from './api/ArbeidsgiverAPI';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

describe('App', () => {
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

  const ARBEIDSGIVERE = [{ Name: 'ABC', OrganizationNumber: '123456789' } as Organisasjon];
  const INGEN_ARBEIDSGIVERE = [];
  const APPLICATION_ROUTES = 'application-routes';
  const LOGIN_REDIRECT = 'login-provider-redirect';
  const SPINNER = 'login-provider-checking';

  it('should show spinner while loading expiry', () => {
    act(() => {
      render(makeRouter('/', Status.NotStarted, false, INGEN_ARBEIDSGIVERE), container);
    });
    expect(container).toContainHTML(SPINNER);
    expect(container).not.toContainHTML(LOGIN_REDIRECT);
    expect(container).not.toContainHTML(APPLICATION_ROUTES);
  });

  it('should redirect when not logged in', async () => {
    act(() => {
      render(makeRouter('/', Status.Successfully, false, INGEN_ARBEIDSGIVERE), container);
    });
    // expect(container).not.toContain(SPINNER);
    expect(container).toContain(LOGIN_REDIRECT);
    // expect(container).not.toContain(APPLICATION_ROUTES);
  });

  // it('should prevent infinite loop', () => {
  //   act(() => {
  //     render(
  //       makeRouter('/', Status.NotStarted, false, INGEN_ARBEIDSGIVERE)
  //       , container
  //     );
  //   });
  //   expect(container).not.toContainHTML(SPINNER);
  //   expect(container).toContainHTML(LOGIN_REDIRECT);
  //   expect(container).not.toContainHTML(APPLICATION_ROUTES);
  // });
  //
  // it('should show ApplicationRoutes when logged in', () => {
  //   act(() => {
  //     render(
  //       makeRouter('/', Status.Successfully, true, ARBEIDSGIVERE)
  //       , container
  //     );
  //   });
  //   expect(container).not.toContainHTML(SPINNER);
  //   expect(container).not.toContainHTML(LOGIN_REDIRECT);
  //   expect(container).toContainHTML(APPLICATION_ROUTES);
  // });

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };
  const makeRouter = (path: string, status: number, loggedIn: boolean, arbeidsgivere: Array<Organisasjon>) => {
    return (
      <Router history={makeHistory(path)}>
        <Application loggedIn={loggedIn} loginStatus={status} arbeidsgivere={arbeidsgivere} />
      </Router>
    );
  };
});
