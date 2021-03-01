import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import KravPeriode from './KravPeriode';

import { KroniskKravPeriode } from './KroniskKravState';
import { Actions } from './Actions';

const enkeltPeriode: KroniskKravPeriode = {};

describe('KravPeriode', () => {
  it('should show first row', async () => {
    const mockDispatch = jest.fn();

    render(<KravPeriode dispatch={mockDispatch} index={0} enkeltPeriode={enkeltPeriode} />);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beløp/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).not.toBeInTheDocument();
  });

  it('should show second row', async () => {
    const mockDispatch = jest.fn();

    render(<KravPeriode dispatch={mockDispatch} index={1} enkeltPeriode={enkeltPeriode} />);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beløp/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show a random row', async () => {
    const mockDispatch = jest.fn();
    const randomRow = Math.floor(Math.random() * 1000) + 1;

    render(<KravPeriode dispatch={mockDispatch} index={randomRow} enkeltPeriode={enkeltPeriode} />);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beløp/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show and delete the second row when clicked second row', async () => {
    const mockDispatch = jest.fn();

    render(<KravPeriode dispatch={mockDispatch} index={1} enkeltPeriode={enkeltPeriode} />);

    const slettButton = screen.queryByText(/Slett/);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beløp/)[0]).toBeInTheDocument();
    expect(slettButton).toBeInTheDocument();

    slettButton?.click();

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { periode: 1 }, type: Actions.DeletePeriod });
  });

  it('call dispatch when beløp has been updated', async () => {
    const mockDispatch = jest.fn();

    render(<KravPeriode dispatch={mockDispatch} index={1} enkeltPeriode={enkeltPeriode} />);

    const inputBelop = screen.getByPlaceholderText('Kr:');

    fireEvent.change(inputBelop, { target: { value: '20000' } });

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { beloep: 20000, periode: 1 }, type: Actions.Beloep });
  });

  it('call dispatch when dager has been updated', async () => {
    const mockDispatch = jest.fn();

    render(<KravPeriode dispatch={mockDispatch} index={1} enkeltPeriode={enkeltPeriode} />);

    const selectDager = screen.getByDisplayValue('-');

    fireEvent.change(selectDager, { target: { value: 12 } });

    expect(mockDispatch).toHaveBeenCalledWith({ payload: { dager: 12, periode: 1 }, type: Actions.Dager });
  });

  it('should have no a11y violations', async () => {
    const mockDispatch = jest.fn();

    const { container } = render(<KravPeriode dispatch={mockDispatch} index={0} enkeltPeriode={enkeltPeriode} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
