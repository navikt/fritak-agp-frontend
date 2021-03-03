import { defaultNotitikasjonState } from './NotifikasjonState';
import NotifikasjonReducer from './NotifikasjonReducer';
import { Actions, NotifikasjonAction } from './NotifikasjonAction';
import HttpStatus from '../../api/HttpStatus';
import NotifikasjonType from './NotifikasjonType';

describe('NotikasjonRedudcer', () => {
  it('should handle response', () => {
    let state = NotifikasjonReducer(defaultNotitikasjonState(), {
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

  it('should handle error', () => {
    let state = NotifikasjonReducer(defaultNotitikasjonState(), {
      type: Actions.HandleResponse,
      payload: {
        notifikasjonsType: NotifikasjonType.GravidSoknad,
        status: HttpStatus.Error
      }
    } as NotifikasjonAction);
    expect(state.notifikasjonType).toEqual(NotifikasjonType.GravidSoknad);
    expect(state.status).toEqual(HttpStatus.Error);
  });

  it('should handle reset', () => {
    let state = NotifikasjonReducer(defaultNotitikasjonState(), {
      type: Actions.Reset,
      payload: {}
    } as NotifikasjonAction);
    expect(state.notifikasjonType).toBeUndefined();
    expect(state.status).toBeUndefined();
  });

  it('should throw error when action not implemented', () => {});
});
