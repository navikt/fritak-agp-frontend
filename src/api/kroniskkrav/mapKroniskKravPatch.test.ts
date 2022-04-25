import EndringsAarsak from '../../components/gravidkrav/EndringsAarsak';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { Dato, parseDato } from '../../utils/dato/Dato';
import { mapKroniskKravPatch } from './mapKroniskKravPatch';

describe('mapKroniskKravPatch', () => {
  const enDato: Dato = parseDato('22.04.2022');
  const perioder: Array<KroniskKravPeriode> = [
    {
      fom: enDato,
      tom: enDato,
      dager: 5,
      belop: 125,
      grunnbeloep: 678,
      uniqueKey: 'random-string',
      sykemeldingsgrad: '50',
      gradering: 0.5
    }
  ];
  it('should throw an error on missing fnr', () => {
    expect(() => mapKroniskKravPatch(undefined, 'orgnr', undefined, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Fnr må spesifiseres'
    );
  });

  it('should throw an error on missing orgnr', () => {
    expect(() => mapKroniskKravPatch('fnr', undefined, undefined, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Orgnr må spesifiseres'
    );
  });
  it('should throw an error on missing periode', () => {
    expect(() => mapKroniskKravPatch('fnr', 'orgnr', undefined, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Perioder må spesifiseres'
    );
  });

  it('should throw an error on missing bekreft', () => {
    expect(() => mapKroniskKravPatch('fnr', 'orgnr', undefined, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Perioder må spesifiseres'
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
    expect(mapKroniskKravPatch('fnr', 'orgnr', perioder, true, 5, EndringsAarsak.ANNET)).toEqual(expected);
  });
});
