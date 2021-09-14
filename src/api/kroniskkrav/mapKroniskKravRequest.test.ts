import { mapKroniskKravRequest } from './mapKroniskKravRequest';
import { parseDato } from '../../utils/dato/Dato';
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
            fom: parseDato('01.02.2020'),
            tom: parseDato('03.04.2025'),
            dager: 5,
            belop: 3000,
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
            fom: parseDato('01.02.2020'),
            tom: parseDato('03.04.2025'),
            dager: 5,
            belop: 3000,
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
            fom: parseDato('99.02.2020'),
            tom: parseDato('03.04.2025'),
            dager: 5,
            belop: 3000,
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
            fom: parseDato('01.02.2020'),
            tom: parseDato('99.04.2025'),
            dager: 5,
            belop: 3000,
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
        fra: parseDato('01.02.2020'),
        til: parseDato('02.04.2025'),
        dager: undefined,
        belop: 3000,
        uniqueKey: '1'
      }
    ];
    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, undefined);
    }).toThrowError();
  });

  it('should throw error when empty beløp', () => {
    const periode = [
      {
        fra: parseDato('01.02.2020'),
        til: parseDato('02.04.2025'),
        dager: 3,
        belop: undefined,
        uniqueKey: '1'
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, undefined);
    }).toThrowError();
  });

  it('should throw error when empty bekreft', () => {
    const periode: KroniskKravPeriode[] = [
      {
        fom: parseDato('01.02.2020'),
        tom: parseDato('02.04.2025'),
        dager: 3,
        belop: 3000,
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
        fra: parseDato('01.02.2020'),
        til: parseDato('02.04.2025'),
        dager: 3,
        beloep: undefined,
        uniqueKey: '1'
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, 5);
    }).toThrowError();
  });

  it('should not fail when fnr is 123', () => {
    expect(
      mapKroniskKravRequest(
        '123',
        '456',
        [
          {
            fom: parseDato('01.02.2020'),
            tom: parseDato('03.04.2025'),
            dager: 5,
            belop: 3000,
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
            fom: parseDato('01.02.2020'),
            tom: parseDato('03.04.2025'),
            dager: 5,
            belop: 3000,
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
