import React, { ComponentProps } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import KravPeriode from './KravPeriode';
import type { KravPeriodeData } from '../../../state/KravPeriodeData';
import Datovelger from '../../datovelger/Datovelger';
import getGrunnbeloep from '../../../api/grunnbelop/getGrunnbeloep';
import HttpStatus from '../../../api/HttpStatus';
import { languageInit } from '../../../locale/languageInit';
import i18next from 'i18next';
import Locales from '../../../locale/Locales';
import { Language } from '../../../locale/Language';
import { vi, expect, it } from 'vitest';

const enkeltPeriode: KravPeriodeData = { uniqueKey: 'mocked' };

vi.mock('../../../api/grunnbelop/getGrunnbeloep');

vi.mock('../../datovelger/Datovelger', () => ({
  default: ({ id, label, onDateChange }: ComponentProps<typeof Datovelger>) => (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type='date'
        onChange={(event) =>
          onDateChange?.(event.currentTarget.value ? new Date(`${event.currentTarget.value}T00:00:00`) : undefined)
        }
      />
    </label>
  )
}));

const createCallbacks = () => ({
  onFraChange: vi.fn(),
  onTilChange: vi.fn(),
  onDagerChange: vi.fn(),
  onBelopChange: vi.fn(),
  onSykemeldingsgradChange: vi.fn(),
  onGrunnbelopChange: vi.fn(),
  onDelete: vi.fn()
});

describe('KravPeriode', () => {
  languageInit(i18next, Language.nb, Locales);

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getGrunnbeloep).mockResolvedValue({ status: HttpStatus.Error });
  });

  it('should show first row', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={0} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={false} />
    );

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).not.toBeInTheDocument();
  });

  it('should show second row', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={1} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={true} />
    );
    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show a random row', async () => {
    const callbacks = createCallbacks();
    const randomRow = 667;

    render(
      <KravPeriode
        {...callbacks}
        index={randomRow}
        enkeltPeriode={enkeltPeriode}
        lonnspliktDager={260}
        slettbar={true}
      />
    );

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Slett/)).toBeInTheDocument();
  });

  it('should show and delete the second row when clicked second row', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={1} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={true} />
    );

    const slettButton = screen.queryByText(/Slett/);

    expect(screen.getByLabelText(/Fra dato/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Til dato/)).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Antall dager/)[0]).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(slettButton).toBeInTheDocument();

    slettButton?.click();

    expect(callbacks.onDelete).toHaveBeenCalledExactlyOnceWith();
  });

  it('calls onBelopChange with a number when beløp has been updated', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={1} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={true} />
    );

    const inputBelop = screen.getByPlaceholderText('Kr:');

    fireEvent.change(inputBelop, { target: { value: '20000' } });

    expect(callbacks.onBelopChange).toHaveBeenCalledExactlyOnceWith(20000);

    fireEvent.change(inputBelop, { target: { value: '' } });

    expect(callbacks.onBelopChange).toHaveBeenLastCalledWith(undefined);
  });

  it('calls onDagerChange with a number when dager has been updated', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={1} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={true} />
    );

    const selectDager = screen.getByDisplayValue('-');

    fireEvent.change(selectDager, { target: { value: 12 } });

    expect(callbacks.onDagerChange).toHaveBeenCalledExactlyOnceWith(12);
  });

  it('calls onSykemeldingsgradChange with the entered string', () => {
    const callbacks = createCallbacks();
    render(
      <KravPeriode {...callbacks} index={0} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={false} />
    );

    fireEvent.change(screen.getByPlaceholderText('100%'), { target: { value: '50' } });

    expect(callbacks.onSykemeldingsgradChange).toHaveBeenCalledExactlyOnceWith('50');

    fireEvent.change(screen.getByPlaceholderText('100%'), { target: { value: '' } });

    expect(callbacks.onSykemeldingsgradChange).toHaveBeenLastCalledWith('');
  });

  it.each([
    { label: /Fra dato/, callback: 'onFraChange' as const, grunnbelopCalls: [['2025-01-15']] },
    { label: /Til dato/, callback: 'onTilChange' as const, grunnbelopCalls: [] }
  ])('calls $callback with the selected date and undefined when cleared', ({ label, callback, grunnbelopCalls }) => {
    const callbacks = createCallbacks();
    render(
      <KravPeriode {...callbacks} index={0} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={false} />
    );

    fireEvent.change(screen.getByLabelText(label), { target: { value: '2025-01-15' } });

    expect(callbacks[callback]).toHaveBeenCalledExactlyOnceWith(new Date(2025, 0, 15));

    fireEvent.change(screen.getByLabelText(label), { target: { value: '' } });

    expect(callbacks[callback]).toHaveBeenLastCalledWith(undefined);
    expect(vi.mocked(getGrunnbeloep).mock.calls).toEqual(grunnbelopCalls);
  });

  it.each([false, true])('calls onGrunnbelopChange for an existing from-date: %s', async (existingDate) => {
    const callbacks = createCallbacks();
    vi.mocked(getGrunnbeloep).mockResolvedValue({
      status: HttpStatus.Successfully,
      grunnbeloep: {
        dato: '2025-01-15',
        grunnbeloep: 130160,
        grunnbeloepPerMaaned: 10846,
        gjennomsnittPerAar: 128116,
        omregningsfaktor: 1
      }
    });
    render(
      <KravPeriode
        {...callbacks}
        index={0}
        enkeltPeriode={existingDate ? { ...enkeltPeriode, fom: { year: 2025, month: 1, day: 15 } } : enkeltPeriode}
        lonnspliktDager={260}
        slettbar={false}
      />
    );

    if (!existingDate) {
      fireEvent.change(screen.getByLabelText(/Fra dato/), { target: { value: '2025-01-15' } });
    }

    await waitFor(() => expect(callbacks.onGrunnbelopChange).toHaveBeenCalledExactlyOnceWith(130160));
    expect(getGrunnbeloep).toHaveBeenCalledExactlyOnceWith('2025-01-15');
  });

  it.todo('should have no a11y violations for 1 row');
  it.todo('should have no a11y violations for more rows - when Datovelger behaves');
});
