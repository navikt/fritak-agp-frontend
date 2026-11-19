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
import SideRamme from '../felles/Side/SideRamme';

interface NotifikasjonStateProps {
  notifikasjonState?: NotifikasjonState;
  notifikasjonType: NotifikasjonType;
}

const NotifikasjonController = ({
  notifikasjonState,
  notifikasjonType = NotifikasjonType.Ukjent
}: NotifikasjonStateProps) => {
  const [state, dispatch] = useReducer(
    NotifikasjonReducer,
    defaultNotifikasjonState({
      ...notifikasjonState,
      notifikasjonType
    })
  );
  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    if (!uuid || notifikasjonState !== undefined) {
      return;
    }

    let isActive = true;

    dispatch({
      type: Actions.Reset,
      payload: {
        notifikasjonsType: notifikasjonType,
        uuid
      }
    });

    GetHandler(getNotifikasjonUrl(uuid, notifikasjonType))
      .then((response) => {
        if (!isActive) {
          return;
        }

        dispatch({
          type: Actions.HandleResponse,
          payload: {
            notifikasjonsType: notifikasjonType,
            json: response.json,
            status: response.status,
            uuid
          }
        } as NotifikasjonAction);
      })
      .catch((response) => {
        if (!isActive) {
          return;
        }

        dispatch({
          type: Actions.HandleError,
          payload: {
            status: response.status,
            notifikasjonsType: notifikasjonType,
            uuid
          }
        } as NotifikasjonAction);
      });

    return () => {
      isActive = false;
    };
  }, [notifikasjonState, notifikasjonType, uuid]);

  return (
    <SideRamme>
      <NotifikasjonView state={state} />
    </SideRamme>
  );
};

export default NotifikasjonController;
