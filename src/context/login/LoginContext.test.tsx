import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { LoginProvider } from './LoginContext';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { LoginStatus } from './LoginStatus';

import timezone_mock from 'timezone-mock';
import MockDate from 'mockdate';
import { waitFor } from '@testing-library/react';

timezone_mock.register('Europe/London');

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
        <Router history={makeHistory('/')}>
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
        <Router history={makeHistory('/')}>
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
        <Router history={makeHistory('/')}>
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
    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:28:57.125+0000');

    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <LoginProvider loginServiceUrl='http://mock.it' baseUrl='http://mock.it'>
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
    const input = '2020-01-23T08:27:57.125+0000';
    const mockApi = Promise.resolve({
      status: 401,
      json: () => Promise.resolve(undefined)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:26:57.125+0000');

    render(
      <Router history={makeHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='http://mock.it' baseUrl='http://mock.it'>
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
      <Router history={makeHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='http://mock.it' baseUrl='http://mock.it'>
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
      <Router history={makeHistory('/page?loggedIn=true')}>
        <LoginProvider loginServiceUrl='http://mock.it' baseUrl='http://mock.it'>
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
    const input = '2020-01-23T08:27:57.125+0000';
    const mockApi = Promise.resolve({
      status: 500,
      json: () => Promise.resolve(undefined)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);

    MockDate.set('2020-01-23T08:29:57.125+0000');

    render(
      <Router history={makeHistory('/page')}>
        <LoginProvider loginServiceUrl='http://mock.it' baseUrl='http://mock.it'>
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
