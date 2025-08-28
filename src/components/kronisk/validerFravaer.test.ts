import { validerFravaer } from './validerFravaer';
import KroniskState from './KroniskState';
import { FravaerType } from './Actions';

describe('validerFravaer', () => {
  it('should throw Error when illegal dager', () => {
    expect(() => {
      validerFravaer(
        {
          year: 2020,
          month: -1,
          dager: 'a'
        } as FravaerType,
        {} as KroniskState
      );
    }).toThrowError();
  });

  it('should allow empty value', () => {
    expect(() => {
      validerFravaer(
        {
          year: 2020,
          month: 0,
          dager: ''
        } as FravaerType,
        {} as KroniskState
      );
    }).not.toThrowError();
  });

  it('should throw Error when illegal month', () => {
    expect(() => {
      validerFravaer(
        {
          year: 2020,
          month: -1,
          dager: '12'
        } as FravaerType,
        {} as KroniskState
      );
    }).toThrowError();
    expect(() => {
      validerFravaer(
        {
          year: 2020,
          month: 12,
          dager: '12'
        } as FravaerType,
        {} as KroniskState
      );
    }).toThrowError();
  });

  it('should set value', () => {
    const fravaer = {
      year: 2020,
      month: 3,
      dager: '12'
    } as FravaerType;
    const nextState = validerFravaer(fravaer, {} as KroniskState);
    expect(nextState.fravaer?.length).toEqual(1);
    if (!nextState.fravaer) nextState.fravaer = [{ year: 1 }];
    expect(nextState.fravaer[0].year).toEqual(2020);
    expect(nextState.fravaer[0].apr).toEqual(12);
  });

  it('should update existing value', () => {
    const f1 = {
      year: 2020,
      month: 3,
      dager: '12'
    } as FravaerType;
    const state2 = validerFravaer(f1, {} as KroniskState);
    expect(state2.fravaer?.length).toEqual(1);
    if (!state2.fravaer) state2.fravaer = [{ year: 1 }];
    expect(state2.fravaer[0].year).toEqual(2020);
    expect(state2.fravaer[0].apr).toEqual(12);

    const f2 = {
      year: 2020,
      month: 3,
      dager: '5'
    } as FravaerType;
    const state3 = validerFravaer(f2, state2);
    expect(state3.fravaer?.length).toEqual(1);
    if (!state3.fravaer) state3.fravaer = [{ year: 1 }];
    expect(state3.fravaer[0].year).toEqual(2020);
    expect(state3.fravaer[0].apr).toEqual(5);
  });

  it('should remove empty years', () => {
    const state = {} as KroniskState;
    const f1 = {
      year: 2020,
      month: 0,
      dager: '5'
    } as FravaerType;
    const state2 = validerFravaer(f1, state);
    expect(state2.fravaer?.length).toEqual(1);
    const f2 = {
      year: 2020,
      month: 0,
      dager: ''
    } as FravaerType;
    const state3 = validerFravaer(f2, state2);
    expect(state3.fravaer?.length).toEqual(0);
  });
});
