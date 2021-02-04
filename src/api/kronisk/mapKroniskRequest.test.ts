import { mapKroniskRequest } from './mapKroniskRequest';
import ArbeidType from '../../components/kronisk/ArbeidType';
import PaakjenningerType from '../../components/kronisk/PaakjenningerType';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

describe('mapKroniskRequest', () => {
  const fnr = '123456789';
  const orgnr = '987654321';
  const bekreft = true;
  const arbeid = [ArbeidType.KREVENDE];
  const paakjenninger = [PaakjenningerType.ALLERGENER];
  const kommentar = 'En liten kommentar';
  const fravaer = [
    {
      year: 2020,
      jan: 5,
      feb: 3,
      dec: 12
    } as Aarsfravaer
  ];

  it('should fail when no arbeidstype', async () => {
    expect(() => {
      mapKroniskRequest([], paakjenninger, fravaer, fnr, orgnr, bekreft, kommentar);
    }).toThrow('Må ha minst en arbeidstype');
  });

  it('should fail when no PaakjenningBeskrivelse', async () => {
    expect(() => {
      mapKroniskRequest(arbeid, [PaakjenningerType.ANNET], fravaer, fnr, orgnr, bekreft, undefined);
    }).toThrow('Må ha kommentar til påkjenning');
  });

  it('should fail when no PaakjenningBeskrivelse', async () => {
    expect(() => {
      mapKroniskRequest(arbeid, [PaakjenningerType.ANNET], fravaer, fnr, orgnr, bekreft, kommentar);
    }).not.toThrow('Må ha kommentar til påkjenning');
  });

  it('should fail when no påkjenninger', async () => {
    expect(() => {
      mapKroniskRequest(arbeid, [], fravaer, fnr, orgnr, bekreft, kommentar);
    }).toThrow('Må ha minst en påkjenningstype');
  });

  it('should fail when no fravær', async () => {
    expect(() => {
      mapKroniskRequest(arbeid, paakjenninger, [], fnr, orgnr, bekreft, kommentar);
    }).toThrow('Må ha minst en fravær');
  });

  it('should not fail when all props', async () => {
    const r = mapKroniskRequest(arbeid, paakjenninger, fravaer, fnr, orgnr, bekreft, kommentar);
    expect(r.identitetsnummer).toEqual('123456789');
  });
});
