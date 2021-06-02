import React from 'react';
import { Router } from 'react-router-dom';
import { LoginProvider } from './LoginContext';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { LoginStatus } from './LoginStatus';
import mockHistory from '../../mockData/mockHistory';
import timezone_mock from 'timezone-mock';
import MockDate from 'mockdate';
import { waitFor } from '@testing-library/react';
import mockFetch from '../../mockData/mockFetch';

timezone_mock.register('Europe/London');

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str
      }
    };
  }
}));

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

  it('should show login-redirect when the token has expired', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    mockFetch(200, input);
    MockDate.set('2020-01-23T08:28:57.125+0000');
    act(() => {
      render(
        <Router history={mockHistory('/')}>
          <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
            ChildrenHere
          </LoginProvider>
        </Router>,
        container
      );
    });

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });

  it('should show tilgangsfeil-side when the token has expired', () => {
    const mockApi = Promise.resolve({
      status: 401,
      json: () => Promise.resolve(undefined)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:26:57.125+0000');

    render(
      <Router history={mockHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </Router>,
      container
    );

    waitFor(() => {
      expect(container).toContainHTML('tilgangsfeil-side');
    });
  });

  it('should show login-redirect when the token has expired and the loggedIn param is in the url', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:28:57.125+0000');

    render(
      <Router history={mockHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </Router>,
      container
    );

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });

  it('should show the children when everything is OK', () => {
    const input = '2020-01-23T08:27:57.125+0000';
    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:22:57.125+0000');

    render(
      <Router history={mockHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </Router>,
      container
    );

    waitFor(() => {
      expect(container).toContainHTML('ChildrenHere');
    });
  });

  it('should roll over and die when everything fails', () => {
    const mockApi = Promise.resolve({
      status: 500,
      json: () => Promise.resolve(undefined)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:29:57.125+0000');

    render(
      <Router history={mockHistory('/page')}>
        <LoginProvider loginServiceUrl='https://mock.it' baseUrl='https://mock.it'>
          ChildrenHere
        </LoginProvider>
      </Router>,
      container
    );

    waitFor(() => {
      expect(container).toContainHTML('login-redirect');
    });
  });
});
