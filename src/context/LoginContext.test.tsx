import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import { LoginProvider, LoginRedirect } from './LoginContext';

describe('LoginContext', () => {
  let assignMock = jest.fn();

  beforeEach(() => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      hostname: 'nav.no',
      href: '/fritak-agp',
      pathname: '/gravid',
      search: 'loggedIn=true'
    };
  });

  afterEach(() => {
    assignMock.mockClear();
  });

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should redirect to loginProver when not logged in', () => {
    expect(
      TestRenderer.create(
        <Router history={makeHistory('/')}>
          <LoginProvider loggedIn={false}>ChildrenHere</LoginProvider>
        </Router>
      ).root.find(LoginRedirect)
    );
  });

  it('should remove loginProvider parameter from url on callback', () => {
    expect(
      TestRenderer.create(
        <Router history={makeHistory('/')}>
          <LoginProvider loggedIn={true}>ChildrenHere</LoginProvider>
        </Router>
      ).toJSON()
    ).toContain('ChildrenHere');
  });
});
