import { describe, it, expect } from 'vitest';
import buildArbeidsgiver from './buildArbeidsgiver';
import { Organisasjon } from '@navikt/virksomhetsvelger';

describe('buildArbeidsgiver', () => {
  it('should create an Organisasjon object with the given navn, orgnr, and underenheter', () => {
    const navn = 'Test Navn';
    const orgnr = '123456789';
    const underenheter: Organisasjon[] = [
      { navn: 'Underenhet 1', orgnr: '987654321', underenheter: [] },
      { navn: 'Underenhet 2', orgnr: '123123123', underenheter: [] }
    ];

    const result = buildArbeidsgiver(navn, orgnr, underenheter);

    expect(result).toEqual({
      navn,
      orgnr,
      underenheter
    });
  });

  it('should create an Organisasjon object with empty underenheter if none are provided', () => {
    const navn = 'Test Navn';
    const orgnr = '123456789';
    const underenheter: Organisasjon[] = [];

    const result = buildArbeidsgiver(navn, orgnr, underenheter);

    expect(result).toEqual({
      navn,
      orgnr,
      underenheter
    });
  });
});
