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
        {} as KroniskState,
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
        {} as KroniskState,
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
        {} as KroniskState,
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
        {} as KroniskState,
        {} as KroniskState
      );
    }).toThrowError();
  });

  it('should throw Error when illegal dager', () => {});

  it('should set value', () => {
    let state = {} as KroniskState;
    let fravaer = {
      year: 2020,
      month: 3,
      dager: '12'
    } as FravaerType;
    let nextState = validerFravaer(fravaer, state, {} as KroniskState);
    expect(nextState.fravaer?.length).toEqual(1);
    expect(nextState.fravaer[0].year).toEqual(2020);
    expect(nextState.fravaer[0].apr).toEqual(12);
  });

  it('should update existing value', () => {
    let state = {} as KroniskState;
    let f1 = {
      year: 2020,
      month: 3,
      dager: '12'
    } as FravaerType;
    let state2 = validerFravaer(f1, state, {} as KroniskState);
    expect(state2.fravaer?.length).toEqual(1);
    expect(state2.fravaer[0].year).toEqual(2020);
    expect(state2.fravaer[0].apr).toEqual(12);

    let f2 = {
      year: 2020,
      month: 3,
      dager: '5'
    } as FravaerType;
    let state3 = validerFravaer(f2, state2, {} as KroniskState);
    expect(state3.fravaer?.length).toEqual(1);
    expect(state3.fravaer[0].year).toEqual(2020);
    expect(state3.fravaer[0].apr).toEqual(5);
  });

  it('should remove empty years', () => {
    let state = {} as KroniskState;
    let f1 = {
      year: 2020,
      month: 0,
      dager: '5'
    } as FravaerType;
    let state2 = validerFravaer(f1, state, {} as KroniskState);
    expect(state2.fravaer?.length).toEqual(1);
    let f2 = {
      year: 2020,
      month: 0,
      dager: ''
    } as FravaerType;
    let state3 = validerFravaer(f2, state2, {} as KroniskState);
    expect(state3.fravaer?.length).toEqual(0);
  });
});
