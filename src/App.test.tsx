import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Application } from './App';
import { LoginRedirect } from './context/LoginContext';
import LoginExpiryProvider from './context/LoginExpiryContext';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';

describe('App', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should redirect when not logged in', () => {
    expect(
      TestRenderer.create(
        <Router history={makeHistory('/')}>
          <Application loggedIn={false} />
        </Router>
      ).root.find(LoginRedirect)
    );
  });

  it('should show LoginExpiry when logged in and empty ', () => {
    expect(
      TestRenderer.create(
        <Router history={makeHistory('/')}>
          <Application loggedIn={true} loginStatus={0} />
        </Router>
      ).root.findByType(LoginExpiryProvider)
    );
  });

  it('should show Side when logged in and expiry is not empty', () => {
    expect(
      TestRenderer.create(
        <Router history={makeHistory('/fritak-agp/')}>
          <Application loggedIn={true} loginStatus={2} />
        </Router>
      ).root.findByType(ApplicationRoutes)
    );
  });
});
