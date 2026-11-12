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
import { format } from 'date-fns';

const enkeltPeriode: KravPeriodeData = { uniqueKey: 'mocked' };

vi.mock('../../../api/grunnbelop/getGrunnbeloep');

vi.mock('../../datovelger/Datovelger', () => ({
  default: ({ id, label, onDateChange, defaultSelected }: ComponentProps<typeof Datovelger>) => (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type='date'
        defaultValue={defaultSelected ? format(defaultSelected, 'yyyy-MM-dd') : ''}
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
  onBeloepChange: vi.fn(),
  onSykemeldingsgradChange: vi.fn(),
  onGrunnbeloepChange: vi.fn(),
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
    expect(screen.queryByLabelText(/Antall dager/)).not.toBeInTheDocument();
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
    expect(screen.queryByLabelText(/Antall dager/)).not.toBeInTheDocument();
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
    expect(screen.queryByLabelText(/Antall dager/)).not.toBeInTheDocument();
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
    expect(screen.queryByLabelText(/Antall dager/)).not.toBeInTheDocument();
    expect(screen.queryAllByLabelText(/Beregnet månedsinntekt/)[0]).toBeInTheDocument();
    expect(slettButton).toBeInTheDocument();

    slettButton?.click();

    expect(callbacks.onDelete).toHaveBeenCalledExactlyOnceWith();
  });

  it('calls onBeloepChange with a number when beløp has been updated', async () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode {...callbacks} index={1} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={true} />
    );

    const inputBeloep = screen.getByPlaceholderText('Kr:');

    fireEvent.change(inputBeloep, { target: { value: '20000' } });

    expect(callbacks.onBeloepChange).toHaveBeenCalledExactlyOnceWith(20000);

    fireEvent.change(inputBeloep, { target: { value: '' } });

    expect(callbacks.onBeloepChange).toHaveBeenLastCalledWith(undefined);
  });

  it('preserves loaded days until a date changes', () => {
    const callbacks = createCallbacks();

    render(
      <KravPeriode
        {...callbacks}
        index={0}
        enkeltPeriode={{
          ...enkeltPeriode,
          fom: new Date(2025, 0, 15),
          tom: new Date(2025, 0, 20),
          dager: 6
        }}
        lonnspliktDager={260}
        slettbar={false}
      />
    );

    expect(callbacks.onDagerChange).not.toHaveBeenCalled();
  });

  it.each([
    { label: /Fra dato/, value: '2025-01-17', dager: 4 },
    { label: /Til dato/, value: '2025-01-17', dager: 3 },
    { label: /Til dato/, value: '2025-01-15', dager: 1 },
    { label: /Fra dato/, value: '', dager: undefined },
    { label: /Til dato/, value: '', dager: undefined }
  ])('calculates $dager days when $label changes to $value', ({ label, value, dager }) => {
    const callbacks = createCallbacks();
    render(
      <KravPeriode
        {...callbacks}
        index={0}
        enkeltPeriode={{
          ...enkeltPeriode,
          fom: new Date(2025, 0, 15),
          tom: new Date(2025, 0, 20),
          dager: 6
        }}
        lonnspliktDager={260}
        slettbar={false}
      />
    );

    fireEvent.change(screen.getByLabelText(label), { target: { value } });

    expect(callbacks.onDagerChange).toHaveBeenCalledExactlyOnceWith(dager);
  });

  it.each([
    { fom: new Date(2024, 1, 28), value: '2024-03-01' },
    { fom: new Date(2025, 2, 29), value: '2025-03-31' },
    { fom: new Date(2025, 9, 25), value: '2025-10-27' },
    { fom: new Date(2025, 11, 31), value: '2026-01-02' }
  ])('counts calendar days through $value without mutating the start date', ({ fom, value }) => {
    const callbacks = createCallbacks();
    const originalTime = fom.getTime();
    render(
      <KravPeriode
        {...callbacks}
        index={0}
        enkeltPeriode={{ ...enkeltPeriode, fom }}
        lonnspliktDager={260}
        slettbar={false}
      />
    );

    fireEvent.change(screen.getByLabelText(/Til dato/), { target: { value } });

    expect(callbacks.onDagerChange).toHaveBeenCalledExactlyOnceWith(3);
    expect(fom.getTime()).toBe(originalTime);
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
    { label: /Fra dato/, callback: 'onFraChange' as const, grunnbeloepCalls: [['2025-01-15']] },
    { label: /Til dato/, callback: 'onTilChange' as const, grunnbeloepCalls: [] }
  ])('calls $callback with the selected date and undefined when cleared', ({ label, callback, grunnbeloepCalls }) => {
    const callbacks = createCallbacks();
    render(
      <KravPeriode {...callbacks} index={0} enkeltPeriode={enkeltPeriode} lonnspliktDager={260} slettbar={false} />
    );

    fireEvent.change(screen.getByLabelText(label), { target: { value: '2025-01-15' } });

    expect(callbacks[callback]).toHaveBeenCalledExactlyOnceWith(new Date(2025, 0, 15), undefined);

    fireEvent.change(screen.getByLabelText(label), { target: { value: '' } });

    expect(callbacks[callback]).toHaveBeenLastCalledWith(undefined, undefined);
    expect(vi.mocked(getGrunnbeloep).mock.calls).toEqual(grunnbeloepCalls);
  });

  it.each([false, true])('calls onGrunnbeloepChange for an existing from-date: %s', async (existingDate) => {
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
        enkeltPeriode={existingDate ? { ...enkeltPeriode, fom: new Date(2025, 0, 15) } : enkeltPeriode}
        lonnspliktDager={260}
        slettbar={false}
      />
    );

    if (!existingDate) {
      fireEvent.change(screen.getByLabelText(/Fra dato/), { target: { value: '2025-01-15' } });
    }

    await waitFor(() => expect(callbacks.onGrunnbeloepChange).toHaveBeenCalledExactlyOnceWith(130160));
    expect(getGrunnbeloep).toHaveBeenCalledExactlyOnceWith('2025-01-15');
  });

  it.todo('should have no a11y violations for 1 row');
  it.todo('should have no a11y violations for more rows - when Datovelger behaves');
});
