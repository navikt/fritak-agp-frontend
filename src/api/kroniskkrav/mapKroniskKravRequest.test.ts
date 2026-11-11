import { parseISO } from 'date-fns';
import { mapKroniskKravRequest } from './mapKroniskKravRequest';
import { Arbeidsgiverperiode, KroniskKravRequest } from './KroniskKravRequest';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';

describe('mapKroniskKravRequest', () => {
  it('should throw error when missing fnr', () => {
    expect(() => {
      mapKroniskKravRequest(
        undefined,
        '456',
        [
          {
            fom: parseISO('2020-02-01'),
            tom: parseISO('2025-04-03'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
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
        [
          {
            fom: parseISO('2020-02-01'),
            tom: parseISO('2025-04-03'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
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
        [
          {
            fom: parseISO('2020-02-99'),
            tom: parseISO('2025-04-03'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
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
        [
          {
            fom: parseISO('2020-02-01'),
            tom: parseISO('2025-04-99'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
        true,
        undefined
      );
    }).toThrowError();
  });

  it('should throw error when empty dager', () => {
    const periode = [
      {
        fom: parseISO('2020-02-01'),
        tom: parseISO('2025-04-02'),
        dager: undefined,
        beloep: 3000,
        uniqueKey: '1'
      }
    ];
    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, undefined);
    }).toThrowError('Dager må spesifiseres');
  });

  it('should throw error when empty beløp', () => {
    const periode = [
      {
        fom: parseISO('2020-02-01'),
        tom: parseISO('2025-04-02'),
        dager: 3,
        beloep: undefined,
        uniqueKey: '1'
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, undefined);
    }).toThrowError('Beløp må spesifiseres');
  });

  it('should throw error when empty bekreft', () => {
    const periode: KroniskKravPeriode[] = [
      {
        fom: parseISO('2020-02-01'),
        tom: parseISO('2025-04-02'),
        dager: 3,
        beloep: 3000,
        uniqueKey: '1'
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, undefined, 5);
    }).toThrowError();
  });

  it('should throw error when empty periode', () => {
    expect(() => {
      mapKroniskKravRequest('123', '123', undefined, true, 5);
    }).toThrowError();
  });

  it('should throw error when error in beløp', () => {
    const periode = [
      {
        fom: parseISO('2020-02-01'),
        tom: parseISO('2025-04-02'),
        dager: 3,
        beloep: undefined,
        uniqueKey: '1'
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, 5);
    }).toThrowError('Beløp må spesifiseres');
  });

  it('should not fail when fnr is 123', () => {
    expect(
      mapKroniskKravRequest(
        '123',
        '456',
        [
          {
            fom: parseISO('2020-02-01'),
            tom: parseISO('2025-04-03'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
        true,
        undefined
      )
    ).toEqual({
      identitetsnummer: '123',
      virksomhetsnummer: '456',
      perioder: [
        {
          fom: '2020-02-01',
          tom: '2025-04-03',
          gradering: 1,
          antallDagerMedRefusjon: 5,
          månedsinntekt: 3000
        }
      ] as [Arbeidsgiverperiode],
      bekreftet: true
    } as KroniskKravRequest);
  });

  it('should not fail when fnr is 123 and antallDager is 120', () => {
    expect(
      mapKroniskKravRequest(
        '123',
        '456',
        [
          {
            fom: parseISO('2020-02-01'),
            tom: parseISO('2025-04-03'),
            dager: 5,
            beloep: 3000,
            uniqueKey: '1'
          }
        ],
        true,
        120
      )
    ).toEqual({
      identitetsnummer: '123',
      virksomhetsnummer: '456',
      perioder: [
        {
          fom: '2020-02-01',
          tom: '2025-04-03',
          gradering: 1,
          antallDagerMedRefusjon: 5,
          månedsinntekt: 3000
        }
      ] as [Arbeidsgiverperiode],
      bekreftet: true,
      antallDager: 120
    } as KroniskKravRequest);
  });
});
