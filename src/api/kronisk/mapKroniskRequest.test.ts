import { mapKroniskRequest } from './mapKroniskRequest';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

describe('mapKroniskRequest', () => {
  const fnr = '123456789';
  const orgnr = '987654321';
  const bekreft = true;
  const fravaer = [
    {
      year: 2020,
      jan: 5,
      feb: 3,
      dec: 12
    } as Aarsfravaer
  ];
  const antallPerioder = 4;
  const dokumentasjon = 'dokumentasjon';
  const historiskFravaer = false;

  it('should fail when no fravær', async () => {
    const r = mapKroniskRequest([], fnr, orgnr, bekreft, antallPerioder, dokumentasjon, historiskFravaer);
    expect(r).toEqual({
      antallPerioder: 4,
      bekreftet: true,
      dokumentasjon: 'dokumentasjon',
      fravaer: [],
      identitetsnummer: '123456789',
      virksomhetsnummer: '987654321',
      historiskFravaer: false
    });
  });

  it('should not fail when all props', async () => {
    const r = mapKroniskRequest(fravaer, fnr, orgnr, bekreft, antallPerioder, dokumentasjon, historiskFravaer);
    expect(r).toEqual({
      antallPerioder: 4,
      bekreftet: true,
      dokumentasjon: 'dokumentasjon',
      fravaer: [
        { antallDagerMedFravaer: 5, yearMonth: '2020-01' },
        { antallDagerMedFravaer: 3, yearMonth: '2020-02' },
        { antallDagerMedFravaer: 12, yearMonth: '2020-00' }
      ],
      identitetsnummer: '123456789',
      virksomhetsnummer: '987654321',
      historiskFravaer: false
    });
  });

  it('should not fail when historiskFravaer is true', async () => {
    const r = mapKroniskRequest([], fnr, orgnr, bekreft, 0, dokumentasjon, historiskFravaer);
    expect(r).toEqual({
      antallPerioder: 0,
      bekreftet: true,
      dokumentasjon: 'dokumentasjon',
      fravaer: [],
      identitetsnummer: '123456789',
      virksomhetsnummer: '987654321',
      historiskFravaer: false
    });
  });
});
