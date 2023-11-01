import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LoginProvider } from './LoginContext';

import { LoginStatus } from './LoginStatus';
import timezone_mock from 'timezone-mock';
import MockDate from 'mockdate';
import { act, render, waitFor } from '@testing-library/react';
import mockFetch from '../../mock/mockFetch';

timezone_mock.register('Europe/London');
const initHistory = ['/'];

describe('LoginContext', () => {
  let assignMock = vi.fn();
  let container = document.createElement('div');

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      hostname: 'nav.no',
      href: '/grensekomp',
      pathname: '/gravid',
      search: 'loggedIn=true'
    };
    // container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    assignMock.mockClear();
    // unmountComponentAtNode(container);
    container.remove();
  });

  it('should redirect to loginProvider', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    act(() => {
      render(
        <MemoryRouter initialEntries={initHistory}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.MustLogin}>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });

  it('should show children', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    act(() => {
      render(
        <MemoryRouter initialEntries={initHistory}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Verified}>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('ChildrenHere');
    });
  });

  it('should show checking', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    act(() => {
      render(
        <MemoryRouter initialEntries={initHistory}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Checking}>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-provider-checking');
    });
  });

  it('should show failed', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    act(() => {
      render(
        <MemoryRouter initialEntries={initHistory}>
          <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Failed}>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });
    waitFor(() => {
      expect(container).toContainHTML('tilgangsfeil-side');
    });
  });

  it('should show login-redirect when the token has expired', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    MockDate.set('2020-01-23T08:28:57.125+0000');
    act(() => {
      render(
        <MemoryRouter initialEntries={initHistory}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });

  it('should show tilgangsfeil-side when the token has expired', () => {
    const input = '1985-01-23T08:28:57.125+0000';
    mockFetch(200, input);

    act(() => {
      render(
        <MemoryRouter initialEntries={['/page?loggedIn=true']}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('tilgangsfeil-side');
    });
  });

  it('should show login-redirect when the token has expired and the loggedIn param is in the url', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    MockDate.set('2020-01-23T08:28:57.125+0000');

    act(() => {
      render(
        <MemoryRouter initialEntries={['/page?loggedIn=true']}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });

  it('should show the children when everything is OK', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    MockDate.set('2020-01-23T08:22:57.125+0000');

    act(() => {
      render(
        <MemoryRouter initialEntries={['/page?loggedIn=true']}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('ChildrenHere');
    });
  });

  it('should roll over and die when everything fails', () => {
    mockFetch(500, undefined);
    MockDate.set('2020-01-23T08:29:57.125+0000');

    act(() => {
      render(
        <MemoryRouter initialEntries={['/page']}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });
});
