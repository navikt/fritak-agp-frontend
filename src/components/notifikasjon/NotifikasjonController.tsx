import React, { useEffect, useReducer } from 'react';
import GetHandler from '../../api/fetch/GetHandler';
import NotifikasjonReducer from './NotifikasjonReducer';
import SideRamme from '../SideRamme';
import NotifikasjonType from './NotifikasjonType';
import getNotifikasjonUrl from './getNotifikasjonUrl';
import { defaultNotitikasjonState, NotifikasjonState } from './NotifikasjonState';
import { Actions, NotifikasjonAction } from './NotifikasjonAction';
import { useParams } from 'react-router-dom';
import NotifikasjonView from './NotifikasjonView';

export const NotifikasjonSideGravidSoknad = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />
);
export const NotifikasjonSideGravidKrav = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />
);
export const NotifikasjonSideKroniskSoknad = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />
);
export const NotifikasjonSideKroniskKrav = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />
);

interface NotifikasjonStateProps {
  notifikasjonState?: NotifikasjonState;
  notifikasjonType: NotifikasjonType;
}

const NotifikasjonController = ({
  notifikasjonState,
  notifikasjonType = NotifikasjonType.Ukjent
}: NotifikasjonStateProps) => {
  const [state, dispatch] = useReducer(NotifikasjonReducer, notifikasjonState, defaultNotitikasjonState);
  state.notifikasjonType = notifikasjonType;
  let { uuid } = useParams(); // '9a6709da-c481-4166-97e5-80fbcc90cb4f'
  useEffect(() => {
    if (state.status == undefined) {
      GetHandler(getNotifikasjonUrl(uuid, notifikasjonType))
        .then(async (response) => {
          dispatch({
            type: Actions.HandleResponse,
            payload: {
              notifikasjonsType: notifikasjonType,
              json: await response.json,
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
