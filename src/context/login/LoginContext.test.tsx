import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoginProvider } from './LoginContext';

import { LoginStatus } from './LoginStatus';
import timezone_mock from 'timezone-mock';
import MockDate from 'mockdate';
import { render, screen, waitFor } from '@testing-library/react';
import mockFetch from '../../mock/mockFetch';
import { useTranslation } from 'react-i18next';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

timezone_mock.register('Europe/London');
const initHistory = ['/'];

describe('LoginContext', () => {
  const assignMock = vi.fn();

  beforeEach(() => {
    const useTranslationSpy = vi.mocked(useTranslation);
    const tSpy = vi.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    } as unknown as ReturnType<typeof useTranslation>);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.window as any).location = {
      hostname: 'nav.no',
      href: '/grensekomp',
      pathname: '/gravid',
      search: 'loggedIn=true'
    };
  });

  afterEach(() => {
    assignMock.mockClear();
  });

  it('should redirect to loginProvider', async () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.MustLogin}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/login-redirect/)).toBeInTheDocument();
    });
  }, 10000);

  it('should show children', async () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Verified}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/ChildrenHere/)).toBeInTheDocument();
    });
  }, 10000);

  it('should show checking', async () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Checking}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.querySelector('.login-provider-checking')).toBeInTheDocument();
    });
  }, 10000);

  it('should show failed', async () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoginProvider loginServiceUrl='' baseUrl='' status={LoginStatus.Failed}>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.querySelector('.tilgangsfeil-side')).toBeInTheDocument();
    });
  }, 10000);

  it('should show login-redirect when the token has expired', async () => {
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

    await waitFor(() => {
      expect(screen.getByText(/login-redirect/)).toBeInTheDocument();
    });
  }, 10000);

  it('should show tilgangsfeil-side when the token has expired', async () => {
    const input = '1985-01-23T08:28:57.125+0000';
    mockFetch(200, input);

    render(
      <MemoryRouter initialEntries={['/page?loggedIn=true']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/login-redirect/)).toBeInTheDocument();
    });
  }, 10000);

  it('should show login-redirect when the token has expired and the loggedIn param is in the url', async () => {
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

    await waitFor(() => {
      expect(screen.getByText(/login-redirect/)).toBeInTheDocument();
    });
  }, 10000);

  it('should show the children when everything is OK', async () => {
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

    await waitFor(() => {
      expect(screen.getByText(/ChildrenHere/)).toBeInTheDocument();
    });
  }, 10000);

  it('should roll over and die when everything fails', async () => {
    mockFetch(500, undefined);
    MockDate.set('2020-01-23T08:29:57.125+0000');

    render(
      <MemoryRouter initialEntries={['/page']}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/login-redirect/)).toBeInTheDocument();
    });
  }, 10000);
});
