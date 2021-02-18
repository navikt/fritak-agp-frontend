import React from 'react';
import { Router } from 'react-router-dom';
import { LoginProvider } from './LoginContext';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { LoginStatus } from './LoginStatus';
import mockHistory from '../../mockData/mockHistory';

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

  it('should redirect to loginProvider', () => {
    act(() => {
      render(
        <Router history={mockHistory('/')}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.MustLogin}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('login-redirect');
  });

  it('should show children', () => {
    act(() => {
      render(
        <Router history={mockHistory('/')}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Verified}>
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
        <Router history={mockHistory('/')}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Checking}>
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
        <Router history={mockHistory('/')}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Failed}>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });
    expect(container).toContainHTML('tilgangsfeil-side');
  });
});
