import React, { useEffect, useReducer } from 'react';
import GetHandler from '../../api/fetch/GetHandler';
import NotifikasjonReducer from './state/NotifikasjonReducer';
import SideRamme from '../SideRamme';
import NotifikasjonType from './felles/NotifikasjonType';
import getNotifikasjonUrl from './utils/getNotifikasjonUrl';
import { defaultNotitikasjonState, NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonAction } from './state/NotifikasjonAction';
import { useParams } from 'react-router-dom';
import NotifikasjonView from './NotifikasjonView';
import Actions from './state/Actions';
import NotifikasjonPayload from './state/NotifikasjonPayload';

interface NotifikasjonStateProps {
  notifikasjonState?: NotifikasjonState;
  notifikasjonType: NotifikasjonType;
}

interface NotifikasjonParams {
  uuid: string;
}

const NotifikasjonController = ({
  notifikasjonState,
  notifikasjonType = NotifikasjonType.Ukjent
}: NotifikasjonStateProps) => {
  const [state, dispatch] = useReducer(NotifikasjonReducer, notifikasjonState, defaultNotitikasjonState);
  state.notifikasjonType = notifikasjonType;
  let { uuid }: NotifikasjonParams = useParams();
  useEffect(() => {
    if (state.status === undefined) {
      GetHandler(getNotifikasjonUrl(uuid, notifikasjonType))
        .then((response) => {
          dispatch({
            type: Actions.HandleResponse,
            payload: {
              notifikasjonsType: notifikasjonType,
              json: response.json,
              status: response.status
            } as NotifikasjonPayload
          } as NotifikasjonAction);
        })
        .catch((response) => {
          dispatch({
            type: Actions.HandleError,
            payload: {
              status: response.status,
              notifikasjonsType: notifikasjonType
            } as NotifikasjonPayload
          } as NotifikasjonAction);
        });
    }
  });
  return <SideRamme>{NotifikasjonView(state)}</SideRamme>;
};

export default NotifikasjonController;
