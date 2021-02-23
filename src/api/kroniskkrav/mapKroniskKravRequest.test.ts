import { mapKroniskKravRequest } from './mapKroniskKravRequest';
import { parseDato } from '../../utils/Dato';
import { Arbeidsgiverperiode, KroniskKravRequest } from './KroniskKravRequest';

describe('mapKroniskKravRequest', () => {
  it('should throw error when missing fnr', () => {
    expect(() => {
      mapKroniskKravRequest(
        undefined,
        '456',
        parseDato('01.02.2020'),
        parseDato('03.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when missing orgnr', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        undefined,
        parseDato('01.02.2020'),
        parseDato('03.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when error in fra', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('99.02.2020'),
        parseDato('03.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when error in til', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('99.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when empty dager', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        undefined,
        3000,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when empty beløp', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        2,
        undefined,
        'dokumentasjon',
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when empty dokumentasjon', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        2,
        555,
        'dokumentasjon',
        true,
        5
      );
    }).not.toThrowError();
  });

  it('should throw error when empty bekreft', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        2,
        33,
        'dokumentasjon',
        undefined,
        5
      );
    }).toThrowError();
  });

  it('should throw error when error in beløp', () => {
    expect(() => {
      mapKroniskKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        2,
        undefined,
        'dokumentasjon',
        true,
        5
      );
    }).toThrowError();
  });

  it('should not fail when fnr is 0', () => {
    expect(
      mapKroniskKravRequest(
        '123',
        '456',
        parseDato('01.02.2020'),
        parseDato('03.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        undefined
      )
    ).toEqual({
      identitetsnummer: '123',
      virksomhetsnummer: '456',
      periode: [
        {
          fom: '2020-02-01',
          tom: '2025-04-03',
          antallDagerMedRefusjon: 5,
          beloep: 3000
        }
      ] as [Arbeidsgiverperiode],
      dokumentasjon: 'dokumentasjon',
      bekreftet: true
    } as KroniskKravRequest);
  });
});
