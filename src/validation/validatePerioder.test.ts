import { addDays, parseISO } from 'date-fns';
import { MAX_DAGER_MELLOM_PERIODER } from '../config/konstanter';
import type { KravPeriodeData } from '../state/KravPeriodeData';
import { validatePerioder, ValidatePerioderKeys } from './validatePerioder';

const periode = (fom: string, tom = fom): KravPeriodeData => ({
  uniqueKey: fom,
  fom: parseISO(fom),
  tom: parseISO(tom)
});

describe('validatePerioder', () => {
  it('accepts missing, empty and single periods', () => {
    expect(validatePerioder(undefined)).toEqual([]);
    expect(validatePerioder([])).toEqual([]);
    expect(validatePerioder([periode('2025-01-01')])).toEqual([]);
  });

  it('uses the configured limit rather than a hardcoded value', async () => {
    vi.resetModules();
    vi.doMock('../config/konstanter', () => ({ MAX_DAGER_MELLOM_PERIODER: 2 }));
    try {
      const { validatePerioder: validateConfiguredPerioder } = await import('./validatePerioder');

      expect(validateConfiguredPerioder([periode('2025-01-01'), periode('2025-01-04')])).toEqual([]);
      expect(validateConfiguredPerioder([periode('2025-01-01'), periode('2025-01-05')])).toEqual([
        { index: 1, key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD, value: 2 }
      ]);
    } finally {
      vi.doUnmock('../config/konstanter');
      vi.resetModules();
    }
  });

  it.each([0, 15, 16, 17])('validates %s whole days between periods', (opphold) => {
    const first = periode('2025-01-01', '2025-01-05');
    const second = {
      uniqueKey: 'second',
      fom: addDays(first.tom!, opphold + 1),
      tom: addDays(first.tom!, opphold + 1)
    };

    expect(validatePerioder([first, second])).toEqual(
      opphold > MAX_DAGER_MELLOM_PERIODER
        ? [{ index: 1, key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD, value: MAX_DAGER_MELLOM_PERIODER }]
        : []
    );
  });

  it.each(['2025-01-01', '2025-01-03', '2025-01-05'])('rejects overlap starting %s', (fom) => {
    expect(validatePerioder([periode('2025-01-01', '2025-01-05'), periode(fom, '2025-01-06')])).toEqual([
      { index: 1, key: ValidatePerioderKeys.VALIDATE_PERIODER_OVERLAPP }
    ]);
  });

  it('uses chronological order and preserves original indexes and dates', () => {
    const perioder = [periode('2025-01-23'), periode('2025-01-01', '2025-01-05')];
    const original = structuredClone(perioder);

    expect(validatePerioder(perioder)).toEqual([
      { index: 0, key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD, value: MAX_DAGER_MELLOM_PERIODER }
    ]);
    expect(perioder).toEqual(original);
  });

  it('checks each gap rather than the distance from the first period', () => {
    expect(validatePerioder([periode('2025-01-01'), periode('2025-01-18'), periode('2025-02-04')])).toEqual([]);
    expect(validatePerioder([periode('2025-01-01'), periode('2025-01-18'), periode('2025-02-05')])).toEqual([
      { index: 2, key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD, value: MAX_DAGER_MELLOM_PERIODER }
    ]);
  });

  it('handles contained periods without inventing gaps', () => {
    expect(
      validatePerioder([periode('2025-01-01', '2025-01-16'), periode('2025-01-02'), periode('2025-01-19')])
    ).toEqual([{ index: 1, key: ValidatePerioderKeys.VALIDATE_PERIODER_OVERLAPP }]);
  });

  it.each([
    { uniqueKey: 'missing' },
    { ...periode('2025-01-01'), fom: new Date(NaN) },
    { ...periode('2025-01-01'), tom: undefined },
    periode('2025-01-05', '2025-01-01'),
    { ...periode('2025-01-01'), fomInputError: 'invalid' as const },
    { ...periode('2025-01-01'), tomError: 'Invalid date' }
  ])('leaves invalid or incomplete dates to field validation: $uniqueKey', (invalid) => {
    expect(validatePerioder([invalid, periode('2025-03-01')])).toEqual([]);
  });

  it.each([
    ['2024-02-28', '2024-03-16'],
    ['2025-03-22', '2025-04-08'],
    ['2025-10-18', '2025-11-04'],
    ['2025-12-25', '2026-01-11']
  ])('counts calendar days from %s to %s', (fom, nextFom) => {
    expect(validatePerioder([periode(fom), periode(nextFom)])).toEqual([]);
    const next = parseISO(nextFom);
    expect(
      validatePerioder([periode(fom), { uniqueKey: 'next', fom: addDays(next, 1), tom: addDays(next, 1) }])
    ).toEqual([{ index: 1, key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD, value: MAX_DAGER_MELLOM_PERIODER }]);
  });
});
