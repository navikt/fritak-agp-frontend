import EndringsAarsak from '../../components/gravidkrav/EndringsAarsak';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { Dato, parseDateTilDato } from '../../utils/dato/Dato';
import { mapGravidKravPatch } from './mapGravidKravPatch';

describe('mapGravidKravPatch', () => {
  const enDato: Dato = parseDateTilDato(new Date());
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

  const dokumentasjon = 'dokumentasjon';

  it('should throw an error on missing fnr', () => {
    expect(() =>
      mapGravidKravPatch(undefined, 'orgnr', perioder, dokumentasjon, true, 5, EndringsAarsak.ANNET)
    ).toThrow('Fnr må spesifiseres');
  });

  it('should throw an error on missing orgnr', () => {
    expect(() => mapGravidKravPatch('fnr', undefined, perioder, dokumentasjon, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Orgnr må spesifiseres'
    );
  });
  it('should throw an error on missing periode', () => {
    expect(() => mapGravidKravPatch('fnr', 'orgnr', undefined, dokumentasjon, true, 5, EndringsAarsak.ANNET)).toThrow(
      'Perioder må spesifiseres'
    );
  });

  it('should throw an error on missing bekreft', () => {
    expect(() => mapGravidKravPatch('fnr', 'orgnr', undefined, dokumentasjon, true, 5, EndringsAarsak.ANNET)).toThrow(
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
      virksomhetsnummer: 'orgnr',
      dokumentasjon
    };
    expect(mapGravidKravPatch('fnr', 'orgnr', perioder, dokumentasjon, true, 5, EndringsAarsak.ANNET)).toEqual(
      expected
    );
  });
});
