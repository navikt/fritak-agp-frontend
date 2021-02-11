import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { LoginProvider, LoginStatus } from './LoginContext';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

describe('LoginContext', () => {
  let assignMock = jest.fn();
  let container = document.createElement('div');

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
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    assignMock.mockClear();
    unmountComponentAtNode(container);
    container.remove();
  });

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should redirect to loginProvider', () => {
    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <LoginProvider baseUrl='' status={LoginStatus.MustLogin}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('login-provider-redirect');
  });

  it('should show children', () => {
    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <LoginProvider baseUrl='' status={LoginStatus.Verified}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('ChildrenHere');
  });

  it('should show checking', () => {
    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <LoginProvider baseUrl='' status={LoginStatus.Checking}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('login-provider-checking');
  });

  it('should show failed', () => {
    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <LoginProvider baseUrl='' status={LoginStatus.Failed}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('tilgangsfeil-side');
  });
});
