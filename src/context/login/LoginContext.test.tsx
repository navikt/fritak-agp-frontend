import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LoginProvider } from './LoginContext';

import { LoginStatus } from './LoginStatus';
import timezone_mock from 'timezone-mock';
import MockDate from 'mockdate';
import { render, screen, waitFor } from '@testing-library/react';
import mockFetch from '../../mock/mockFetch';

timezone_mock.register('Europe/London');
const initHistory = ['/'];

describe('LoginContext', () => {
  let assignMock = vi.fn();

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
  });

  afterEach(() => {
    assignMock.mockClear();
  });

  it('should redirect to loginProvider', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.MustLogin}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/login-redirect/);
    });
  }, 10000);

  it('should show children', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Verified}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/ChildrenHere/);
    });
  }, 10000);

  it('should show checking', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Checking}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/login-provider-checking/);
    });
  }, 10000);

  it('should show failed', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Failed}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/tilgangsfeil-side/);
    });
  }, 10000);

  it('should show login-redirect when the token has expired', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    MockDate.set('2020-01-23T08:28:57.125+0000');

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/login-redirect/);
    });
  }, 10000);

  it('should show tilgangsfeil-side when the token has expired', () => {
    const input = '1985-01-23T08:28:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={['/page?loggedIn=true']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/tilgangsfeil-side/);
    });
  }, 10000);

  it('should show login-redirect when the token has expired and the loggedIn param is in the url', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    MockDate.set('2020-01-23T08:28:57.125+0000');

    render(
      <MemoryRouter initialEntries={['/page?loggedIn=true']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/login-redirect/);
    });
  }, 10000);

  it('should show the children when everything is OK', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    MockDate.set('2020-01-23T08:22:57.125+0000');

    render(
      <MemoryRouter initialEntries={['/page?loggedIn=true']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/ChildrenHere/);
    });
  }, 10000);

  it('should roll over and die when everything fails', () => {
    mockFetch(500, undefined);
    MockDate.set('2020-01-23T08:29:57.125+0000');

    render(
      <MemoryRouter initialEntries={['/page']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen).toContain(/login-redirect/);
    });
  }, 10000);
});
