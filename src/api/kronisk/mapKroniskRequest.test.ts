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

  it('should fail when no fravær', async () => {
    expect(() => {
      mapKroniskRequest([], fnr, orgnr, bekreft, antallPerioder, dokumentasjon);
    }).toThrow('Må ha minst en fravær');
  });

  it('should not fail when all props', async () => {
    const r = mapKroniskRequest(fravaer, fnr, orgnr, bekreft, antallPerioder, dokumentasjon);
    expect(r.identitetsnummer).toEqual('123456789');
  });
});
