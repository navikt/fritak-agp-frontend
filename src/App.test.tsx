import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import App from './App';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';

import lenker from './components/lenker';

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

describe('App', () => {
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
});
