import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { MemoryRouter } from 'react-router-dom';

import lenker from './components/lenker';

import loginExpiryAPI from './api/loginExpiryAPI';

import KroniskSide from './components/kronisk/KroniskSide';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidSide from './components/gravid/GravidSide';
import Forside from './components/Forside';
import GravidKvittering from './components/gravid/GravidKvittering';

jest.mock('./components/kronisk/KroniskSide');
jest.mock('./components/tokenFornyet/TokenFornyet');
jest.mock('./components/kronisk/KroniskKvittering');
jest.mock('./components/gravid/GravidSide');
jest.mock('./components/Forside');
jest.mock('./components/gravid/GravidKvittering');

jest.mock('./api/loginExpiryAPI');

describe('App', () => {
  // beforeAll((): void => {
  //   delete window.location;
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //   // @ts-ignore
  //   window.location = {
  //       href: '',
  //   };
  // });

  beforeEach(() => {
    loginExpiryAPI.mockImplementation(
      (): Promise<any> => Promise.resolve({ status: 200 })
    );
  });
  it('should show the default page', async () => {
    Forside.mockImplementation(() => <div>ForsideMock</div>);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('ForsideMock')).toBeInTheDocument();

    cleanup();
  });

  it('should show the Gravid kvittering', async () => {
    GravidKvittering.mockImplementation(() => <div>GravidKvitteringMock</div>);

    render(
      <MemoryRouter
        initialEntries={[lenker.Gravid, lenker.GravidKvittering]}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('GravidKvitteringMock')).toBeInTheDocument();

    cleanup();
  });

  it('should show the gravid page', async () => {
    GravidSide.mockImplementation(() => <div>GravidMock</div>);

    render(
      <MemoryRouter
        initialEntries={[lenker.Home, lenker.Gravid]}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('GravidMock')).toBeInTheDocument();

    cleanup();
  });

  it('should show the kronisk kvittering', async () => {
    KroniskKvittering.mockImplementation(() => (
      <div>KroniskKvitteringMock</div>
    ));

    render(
      <MemoryRouter
        initialEntries={[lenker.Kronisk, lenker.KroniskKvittering]}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('KroniskKvitteringMock')).toBeInTheDocument();

    cleanup();
  });

  it('should show the kronisk side', async () => {
    KroniskSide.mockImplementation(() => <div>KroniskMock</div>);

    render(
      <MemoryRouter
        initialEntries={[lenker.Home, lenker.Kronisk]}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('KroniskMock')).toBeInTheDocument();

    cleanup();
  });

  it('should show the token fornyet side', async () => {
    TokenFornyet.mockImplementation(() => <div>TokenFornyet</div>);

    render(
      <MemoryRouter
        initialEntries={[lenker.Home, lenker.TokenFornyet]}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('TokenFornyet')).toBeInTheDocument();

    cleanup();
  });

  it('should redirect to the login page', async () => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      hostname: 'server.nav.no',
      href: '',
      pathname: 'server.nav.no/login?redirect=http://server.nav.no/path/'
    };

    loginExpiryAPI.mockImplementation(
      (): Promise<any> => Promise.resolve({ status: 401 })
    );

    Forside.mockImplementation(() => <div>ForsideMock</div>);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(window.location.href).toBe(
        'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/?loggedIn=true?redirect=https%3A%2F%2Farbeidsgiver.nav.no%2Ffritak-agp%2Fserver.nav.no%2Flogin%3Fredirect%3Dhttp%3A%2F%2Fserver.nav.no%2Fpath%2F%3FloggedIn%3Dtrue'
      )
    );
  });

  it('should redirect to the login page', async () => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      hostname: 'server.nav.no',
      href: '',
      pathname: 'http://server.nav.no/path/?loggedIn=true'
    };

    loginExpiryAPI.mockImplementation(
      (): Promise<any> => Promise.resolve({ status: 401 })
    );

    Forside.mockImplementation(() => <div>ForsideMock</div>);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(window.location.href).toBe('');
  });
});
