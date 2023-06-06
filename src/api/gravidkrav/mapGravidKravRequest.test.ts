import { mapGravidKravRequest } from './mapGravidKravRequest';

import { GravidKravRequest } from './GravidKravRequest';
import { Arbeidsgiverperiode } from '../kroniskkrav/KroniskKravRequest';

describe('mapGravidKravRequest', () => {
  it('should throw error when missing fnr', () => {
    expect(() => {
      mapGravidKravRequest(
        undefined,
        '456',
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5,
            belop: 3000
          }
        ],
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
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5,
            belop: 3000
          }
        ],
        true,
        undefined
      );
    }).toThrowError();
  });

  // it('should throw error when error in fra', () => {
  //   expect(() => {
  //     mapGravidKravRequest(
  //       '123',
  //       '123',
  //       [
  //         {
  //           uniqueKey: '1',
  //           perioder: [
  //             {
  //               uniqueKey: 'p1',
  //               fom: new Date(2020, 1, 99),
  //               tom: new Date(2025, 3, 3)
  //             }
  //           ],
  //           dager: 5,
  //           belop: 3000
  //         }
  //       ],
  //       true,
  //       undefined
  //     );
  //   }).toThrowError();
  // });

  // it('should throw error when error in til', () => {
  //   expect(() => {
  //     mapGravidKravRequest(
  //       '123',
  //       '123',
  //       [
  //         {
  //           uniqueKey: '1',
  //           perioder: [
  //             {
  //               uniqueKey: 'p1',
  //               fom: new Date(2020, 1, 1),
  //               tom: new Date(2025, 3, 99)
  //             }
  //           ],
  //           dager: 5,
  //           belop: 3000
  //         }
  //       ],
  //       true,
  //       5
  //     );
  //   }).toThrowError();
  // });

  it('should throw error when empty dager', () => {
    expect(() => {
      mapGravidKravRequest(
        '123',
        '123',
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            belop: 3000
          }
        ],
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
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5
          }
        ],
        true,
        5
      );
    }).toThrowError();
  });

  it('should throw error when empty bekreft', () => {
    expect(() => {
      mapGravidKravRequest(
        '123',
        '123',
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5,
            belop: 3000
          }
        ],
        undefined,
        5
      );
    }).toThrowError();
  });

  it('should not fail when fnr is 123', () => {
    expect(
      mapGravidKravRequest(
        '123',
        '456',
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5,
            belop: 3000
          }
        ],
        true,
        5
      )
    ).toEqual({
      identitetsnummer: '123',
      virksomhetsnummer: '456',
      perioder: [
        {
          perioder: [
            {
              fom: '2020-02-01',
              tom: '2025-04-03'
            }
          ],
          gradering: 1,
          antallDagerMedRefusjon: 5,
          månedsinntekt: 3000
        } as Arbeidsgiverperiode
      ],
      bekreftet: true,
      antallDager: 5
    } as GravidKravRequest);
  });

  it('should not fail when fnr is 123 and we have antallDager', () => {
    expect(
      mapGravidKravRequest(
        '123',
        '456',
        [
          {
            uniqueKey: '1',
            perioder: [
              {
                uniqueKey: 'p1',
                fom: new Date(2020, 1, 1),
                tom: new Date(2025, 3, 3)
              }
            ],
            dager: 5,
            belop: 3000
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
          perioder: [
            {
              fom: '2020-02-01',
              tom: '2025-04-03'
            }
          ],
          gradering: 1,
          antallDagerMedRefusjon: 5,
          månedsinntekt: 3000
        } as Arbeidsgiverperiode
      ],
      bekreftet: true,
      antallDager: 120
    } as GravidKravRequest);
  });
});
