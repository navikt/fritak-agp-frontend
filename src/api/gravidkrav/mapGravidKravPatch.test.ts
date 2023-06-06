import EndringsAarsak from '../../components/gravidkrav/EndringsAarsak';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { mapGravidKravPatch } from './mapGravidKravPatch';

describe('mapGravidKravPatch', () => {
  const enDato: Date = new Date(2022, 3, 22);
  const perioder: Array<KroniskKravPeriode> = [
    {
      perioder: [
        {
          fom: enDato,
          tom: enDato,
          uniqueKey: 'raaandom-string'
        }
      ],
      dager: 5,
      belop: 125,
      grunnbeloep: 678,
      uniqueKey: 'random-string',
      sykemeldingsgrad: '50',
      gradering: 0.5
    }
  ];

  it('should throw an error on missing fnr', () => {
    expect(() => mapGravidKravPatch(undefined, 'orgnr', perioder, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Fnr må spesifiseres'
    );
  });

  it('should throw an error on missing orgnr', () => {
    expect(() => mapGravidKravPatch('fnr', undefined, perioder, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Orgnr må spesifiseres'
    );
  });
  it('should throw an error on missing periode', () => {
    expect(() => mapGravidKravPatch('fnr', 'orgnr', undefined, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Perioder må spesifiseres'
    );
  });

  it('should throw an error on missing bekreft', () => {
    expect(() => mapGravidKravPatch('fnr', 'orgnr', perioder, undefined, 5, EndringsAarsak.ANNET)).toThrow(
      'Bekreft må spesifiseres'
    );
  });

  it('should return some data', () => {
    const expected = {
      aarsakEndring: 'ANNET',
      antallDager: 5,
      bekreftet: true,
      identitetsnummer: 'fnr',
      perioder: [
        {
          antallDagerMedRefusjon: 5,
          gradering: 0.5,
          månedsinntekt: 125,
          perioder: [
            {
              fom: '2022-04-22',
              tom: '2022-04-22'
            }
          ]
        }
      ],
      virksomhetsnummer: 'orgnr'
    };
    expect(mapGravidKravPatch('fnr', 'orgnr', perioder, true, 5, EndringsAarsak.ANNET)).toEqual(expected);
  });
});
