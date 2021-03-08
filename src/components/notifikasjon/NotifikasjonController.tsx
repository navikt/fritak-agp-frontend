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
  let { uuid }: NotifikasjonParams = useParams(); // '9a6709da-c481-4166-97e5-80fbcc90cb4f'
  useEffect(() => {
    if (state.status == undefined) {
      GetHandler(getNotifikasjonUrl(uuid, notifikasjonType))
        .then(async (response) => {
          dispatch({
            type: Actions.HandleResponse,
            payload: {
              notifikasjonsType: notifikasjonType,
              json: response.json,
              status: response.status
            }
          } as NotifikasjonAction);
        })
        .catch((status) => {
          dispatch({
            type: Actions.HandleError,
            payload: {
              notifikasjonType: notifikasjonType,
              status: status,
              notifikasjonsType: NotifikasjonType.GravidSoknad
            }
          } as NotifikasjonAction);
        });
    }
  });
  return <SideRamme>{NotifikasjonView(state)}</SideRamme>;
};

export default NotifikasjonController;
