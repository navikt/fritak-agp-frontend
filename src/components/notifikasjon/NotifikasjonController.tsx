import React, { useEffect, useReducer } from 'react';
import GetHandler from '../../api/fetch/GetHandler';
import NotifikasjonReducer from './state/NotifikasjonReducer';
import NotifikasjonType from './felles/NotifikasjonType';
import getNotifikasjonUrl from './utils/getNotifikasjonUrl';
import { defaultNotifikasjonState, NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonAction } from './state/NotifikasjonAction';
import { useParams } from 'react-router-dom';
import NotifikasjonView from './NotifikasjonView';
import Actions from './state/Actions';
import NotifikasjonPayload from './state/NotifikasjonPayload';
import SideRamme from '../felles/Side/SideRamme';

interface NotifikasjonStateProps {
  notifikasjonState?: NotifikasjonState;
  notifikasjonType: NotifikasjonType;
}

const NotifikasjonController = ({
  notifikasjonState,
  notifikasjonType = NotifikasjonType.Ukjent
}: NotifikasjonStateProps) => {
  const [state, dispatch] = useReducer(NotifikasjonReducer, notifikasjonState, defaultNotifikasjonState);
  state.notifikasjonType = notifikasjonType;
  const { uuid } = useParams();
  useEffect(() => {
    console.log('NotifikasjonController useEffect', state);
    if (state.status === undefined) {
      GetHandler(getNotifikasjonUrl(uuid as string, notifikasjonType))
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
