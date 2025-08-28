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
});
