import { mapGravidKravRequest } from './mapGravidKravRequest';
import { parseDato } from '../../utils/Dato';
import { Arbeidsgiverperiode, GravidKravRequest } from './GravidKravRequest';

describe('mapGravidKravRequest', () => {
  it('should throw error when missing fnr', () => {
    expect(() => {
      mapGravidKravRequest(
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
      mapGravidKravRequest(
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
      mapGravidKravRequest(
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
      mapGravidKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('99.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        5
      );
    }).toThrowError();
  });

  it('should throw error when empty dager', () => {
    expect(() => {
      mapGravidKravRequest(
        '123',
        '123',
        parseDato('01.02.2020'),
        parseDato('02.04.2025'),
        undefined,
        3000,
        'dokumentasjon',
        true,
        5
      );
    }).toThrowError();
  });

  it('should throw error when empty beløp', () => {
    expect(() => {
      mapGravidKravRequest(
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

  it('should throw error when empty dokumentasjon', () => {
    expect(() => {
      mapGravidKravRequest(
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
      mapGravidKravRequest(
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
      mapGravidKravRequest(
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

  it('should not fail when fnr is 123', () => {
    expect(
      mapGravidKravRequest(
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
      periode: {
        fom: '2020-02-01',
        tom: '2025-04-03',
        antallDagerMedRefusjon: 5,
        beloep: 3000
      } as Arbeidsgiverperiode,
      dokumentasjon: 'dokumentasjon',
      bekreftet: true
    } as GravidKravRequest);
  });

  it('should not fail when fnr is 123 and we have kontrollDager', () => {
    expect(
      mapGravidKravRequest(
        '123',
        '456',
        parseDato('01.02.2020'),
        parseDato('03.04.2025'),
        5,
        3000,
        'dokumentasjon',
        true,
        120
      )
    ).toEqual({
      identitetsnummer: '123',
      virksomhetsnummer: '456',
      periode: {
        fom: '2020-02-01',
        tom: '2025-04-03',
        antallDagerMedRefusjon: 5,
        beloep: 3000
      } as Arbeidsgiverperiode,
      dokumentasjon: 'dokumentasjon',
      bekreftet: true,
      kontrollDager: 120
    } as GravidKravRequest);
  });
});
