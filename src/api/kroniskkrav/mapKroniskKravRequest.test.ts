import { mapKroniskKravRequest } from './mapKroniskKravRequest';
import { parseDato } from '../../utils/Dato';
import { Arbeidsgiverperiode, KroniskKravRequest } from './KroniskKravRequest';

describe('mapKroniskKravRequest', () => {
  it('should throw error when missing fnr', () => {
    expect(() => {
      mapKroniskKravRequest(
        undefined,
        '456',
        [
          {
            fra: parseDato('01.02.2020'),
            til: parseDato('03.04.2025'),
            dager: 5,
            beloep: 3000
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
            fra: parseDato('01.02.2020'),
            til: parseDato('03.04.2025'),
            dager: 5,
            beloep: 3000
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
            fra: parseDato('99.02.2020'),
            til: parseDato('03.04.2025'),
            dager: 5,
            beloep: 3000
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
            fra: parseDato('01.02.2020'),
            til: parseDato('99.04.2025'),
            dager: 5,
            beloep: 3000
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
        beloep: 3000
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
        beloep: undefined
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, undefined);
    }).toThrowError();
  });

  it('should throw error when empty bekreft', () => {
    const periode = [
      {
        fra: parseDato('01.02.2020'),
        til: parseDato('02.04.2025'),
        dager: 3,
        beloep: 3000
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, undefined, 5);
    }).toThrowError();
  });

  it('should throw error when error in beløp', () => {
    const periode = [
      {
        fra: parseDato('01.02.2020'),
        til: parseDato('02.04.2025'),
        dager: 3,
        beloep: undefined
      }
    ];

    expect(() => {
      mapKroniskKravRequest('123', '123', periode, true, 5);
    }).toThrowError();
  });

  it('should not fail when fnr is 0', () => {
    expect(
      mapKroniskKravRequest(
        '123',
        '456',
        [
          {
            fra: parseDato('01.02.2020'),
            til: parseDato('03.04.2025'),
            dager: 5,
            beloep: 3000
          }
        ],
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
      bekreftet: true
    } as KroniskKravRequest);
  });
});
