import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import KravPeriode from './KravPeriode';
import { KroniskKravPeriode } from './KroniskKravState';
import { Actions } from './Actions';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import { Language } from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from '../../locale/Locales';

const enkeltPeriode: KroniskKravPeriode = { uniqueKey: 'mocked' };

jest.doMock('../datovelger/Datovelger', () => () => {
  return <div>Datovelger</div>;
});

describe('KravPeriode', () => {
  languageInit(i18next, Language.nb, Locales);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should show first row', async () => {
    const mockDispatch = jest.fn();

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={0}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={false}
        Actions={Actions}
      />
    );

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).not.toBeInTheDocument();
  });

  it('should show second row', async () => {
    const mockDispatch = jest.fn();

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={1}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show a random row', async () => {
    const mockDispatch = jest.fn();
    const randomRow = 667;

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={randomRow}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show and delete the second row when clicked second row', async () => {
    const mockDispatch = jest.fn();

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={1}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );

    const slettButton = screen.queryByText(/Slett/);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(slettButton).toBeInTheDocument();

    slettButton?.click();

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { itemId: 'mocked' }, type: Actions.DeletePeriode });
  });

  it('call dispatch when beløp has been updated', async () => {
    const mockDispatch = jest.fn();

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={1}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );

    const inputBelop = screen.getByPlaceholderText('Kr:');

    fireEvent.change(inputBelop, { target: { value: '20000' } });

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { belop: 20000, itemId: 'mocked' }, type: Actions.Beloep });
  });

  it.skip('call dispatch when dager has been updated', async () => {
    const mockDispatch = jest.fn();
    // jest.unmock('../datovelger/Datovelger');

    render(
      <KravPeriode
        dispatch={mockDispatch}
        index={1}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );

    const selectDager = screen.getByDisplayValue('-');

    fireEvent.change(selectDager, { target: { value: 12 } });

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { dager: 12, itemId: 'mocked' }, type: Actions.Dager });
  });

  it.skip('should have no a11y violations for 1 row', async () => {
    const mockDispatch = jest.fn();

    const { container } = render(
      <KravPeriode
        dispatch={mockDispatch}
        index={0}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={false}
        Actions={Actions}
      />
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it.skip('should have no a11y violations for more rows - when Datovelger behaves', async () => {
    const mockDispatch = jest.fn();

    const { container } = render(
      <KravPeriode
        dispatch={mockDispatch}
        index={1}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
        Actions={Actions}
      />
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
