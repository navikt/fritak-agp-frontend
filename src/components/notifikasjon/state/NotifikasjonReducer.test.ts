import { defaultNotifikasjonState } from './NotifikasjonState';
import NotifikasjonReducer from './NotifikasjonReducer';
import { NotifikasjonAction } from './NotifikasjonAction';
import HttpStatus from '../../../api/HttpStatus';
import NotifikasjonType from '../felles/NotifikasjonType';
import Actions from './Actions';

describe('NotikasjonRedudcer', () => {
  it('should handle response', () => {
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidSoknad,
        status: HttpStatus.Successfully,
        json: {}
      }
    } as NotifikasjonAction);
    expect(state.notifikasjonType).toEqual(NotifikasjonType.GravidSoknad);
    expect(state.status).toEqual(HttpStatus.Successfully);
  });

  it('should handle GravidSoknad response and set gravidSoknadResponse', () => {
    const mockGravidSoknadResponse = {
      orgnr: '123456789',
      opprettet: '2024-01-01'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidSoknad,
        status: HttpStatus.Successfully,
        json: mockGravidSoknadResponse
      }
    } as NotifikasjonAction);
    expect(state.gravidSoknadResponse).toEqual(mockGravidSoknadResponse);
  });

  it('should handle GravidKrav response and set gravidKravResponse', () => {
    const mockGravidKravResponse = {
      id: 'krav-123',
      orgnr: '123456789'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidKrav,
        status: HttpStatus.Successfully,
        json: mockGravidKravResponse
      }
    } as NotifikasjonAction);
    expect(state.gravidKravResponse).toEqual(mockGravidKravResponse);
  });

  it('should handle GravidKravSlettet response and set gravidKravResponse', () => {
    const mockGravidKravResponse = {
      id: 'krav-456',
      orgnr: '987654321'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidKravSlettet,
        status: HttpStatus.Successfully,
        json: mockGravidKravResponse
      }
    } as NotifikasjonAction);
    expect(state.gravidKravResponse).toEqual(mockGravidKravResponse);
  });

  it('should handle KroniskKrav response and set kroniskKravResponse', () => {
    const mockKroniskKravResponse = {
      id: 'kronisk-123',
      orgnr: '123456789'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.KroniskKrav,
        status: HttpStatus.Successfully,
        json: mockKroniskKravResponse
      }
    } as NotifikasjonAction);
    expect(state.kroniskKravResponse).toEqual(mockKroniskKravResponse);
  });

  it('should handle KroniskKravSlettet response and set kroniskKravResponse', () => {
    const mockKroniskKravResponse = {
      id: 'kronisk-456',
      orgnr: '987654321'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.KroniskKravSlettet,
        status: HttpStatus.Successfully,
        json: mockKroniskKravResponse
      }
    } as NotifikasjonAction);
    expect(state.kroniskKravResponse).toEqual(mockKroniskKravResponse);
  });

  it('should handle KroniskSoknad response and set kroniskSoknadResponse', () => {
    const mockKroniskSoknadResponse = {
      orgnr: '123456789',
      opprettet: '2024-01-01'
    };
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.KroniskSoknad,
        status: HttpStatus.Successfully,
        json: mockKroniskSoknadResponse
      }
    } as NotifikasjonAction);
    expect(state.kroniskSoknadResponse).toEqual(mockKroniskSoknadResponse);
  });

  it('should handle error', () => {
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.HandleError,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidSoknad,
        status: HttpStatus.Error,
        uuid: 'uuid-uuid-uuid'
      }
    } as NotifikasjonAction);
    expect(state.notifikasjonType).toEqual(NotifikasjonType.GravidSoknad);
    expect(state.status).toEqual(HttpStatus.Error);
    expect(state.uuid).toEqual('uuid-uuid-uuid');
  });

  it('should handle reset', () => {
    const state = NotifikasjonReducer(defaultNotifikasjonState(), {
      type: Actions.Reset,
      payload: {}
    } as NotifikasjonAction);
    expect(state.notifikasjonType).toBeUndefined();
    expect(state.status).toBeUndefined();
  });

  it('should return current state for unknown action type', () => {
    const initialState = defaultNotifikasjonState({
      status: HttpStatus.Successfully,
      notifikasjonType: NotifikasjonType.GravidSoknad
    });
    const state = NotifikasjonReducer(initialState, {
      type: 'UNKNOWN_ACTION' as unknown as Actions,
      payload: {}
    } as NotifikasjonAction);
    expect(state.status).toEqual(HttpStatus.Successfully);
    expect(state.notifikasjonType).toEqual(NotifikasjonType.GravidSoknad);
  });
});
