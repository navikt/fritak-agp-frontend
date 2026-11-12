import { parseISO } from 'date-fns';
import { EndringsAarsak } from '../../components/gravidkrav/EndringsAarsak';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { mapGravidKravPatch } from './mapGravidKravPatch';

describe('mapGravidKravPatch', () => {
  const enDato: Date = parseISO('2022-04-22');
  const perioder: Array<KroniskKravPeriode> = [
    {
      fom: enDato,
      tom: enDato,
      dager: 5,
      beloep: 125,
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
          fom: '2022-04-22',
          gradering: 0.5,
          månedsinntekt: 125,
          tom: '2022-04-22'
        }
      ],
      virksomhetsnummer: 'orgnr'
    };
    expect(mapGravidKravPatch('fnr', 'orgnr', perioder, true, 5, EndringsAarsak.ANNET)).toEqual(expected);
  });
});
