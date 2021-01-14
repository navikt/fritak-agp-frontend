import { mapKroniskRequest } from './mapKroniskRequest';
import { defaultKroniskState } from '../../components/kronisk/KroniskState';
import ArbeidType from '../../components/kronisk/ArbeidType';
import PaakjenningerType from '../../components/kronisk/PaakjenningerType';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

describe('mapKroniskRequest', () => {
  const buildState = () => {
    let state = defaultKroniskState();
    state.fnr = '123456789';
    state.orgnr = '987654321';
    state.bekreft = true;
    state.arbeid = [ArbeidType.KREVENDE];
    state.paakjenninger = [PaakjenningerType.ALLERGENER];
    state.fravaer = Array<Aarsfravaer>();
    state.fravaer.push({
      year: 2020,
      jan: 5,
      feb: 3,
      dec: 12
    } as Aarsfravaer);
    return state;
  };

  it('should fail when no arbeidstype', async () => {
    const state = buildState();
    state.arbeid = [];
    expect(() => {
      mapKroniskRequest(state);
    }).toThrow('Må ha minst en arbeidstype');
  });

  it('should fail when no påkjenninger', async () => {
    const state = buildState();
    state.paakjenninger = [];
    expect(() => {
      mapKroniskRequest(state);
    }).toThrow('Må ha minst en påkjenningstype');
  });

  it('should fail when no fravær', async () => {
    const state = buildState();
    state.fravaer = [];
    expect(() => {
      mapKroniskRequest(state);
    }).toThrow('Må ha minst en fravær');
  });

  it('should not fail when all props', async () => {
    const state = buildState();
    const r = mapKroniskRequest(state);
    expect(r.fnr).toEqual('123456789');
  });
});
