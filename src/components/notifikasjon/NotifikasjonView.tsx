import { NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonSpinner } from './felles/NotifikasjonSpinner';
import HttpStatus from '../../api/HttpStatus';
import { NotifikasjonUkjent } from './felles/NotifikasjonUkjent';
import NotifikasjonType from './felles/NotifikasjonType';
import NotifikasjonFeilmelding from './felles/NotifikasjonFeilmelding';
import GravidSoknadView from './gravid/soknad/GravidSoknadView';
import React from 'react';
import KroniskSoknadView from './kronisk/soknad/KroniskSoknadView';

const NotifikasjonView = (state: NotifikasjonState) => {
  switch (state.status) {
    case undefined:
      return <NotifikasjonSpinner />;
    case HttpStatus.NotFound:
      return <NotifikasjonUkjent />;
    case HttpStatus.Unauthorized:
      return <NotifikasjonUkjent />;
    case HttpStatus.Successfully:
      switch (state.notifikasjonType) {
        case NotifikasjonType.GravidSoknad:
          if (!state.gravidSoknadResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <GravidSoknadView gravidSoknadResponse={state.gravidSoknadResponse} />;
        case NotifikasjonType.KroniskSoknad:
          if (!state.kroniskSoknadResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <KroniskSoknadView kroniskSoknadResponse={state.kroniskSoknadResponse} />;
        default:
          return <NotifikasjonFeilmelding />;
      }
    default:
      return <NotifikasjonFeilmelding />;
  }
};

export default NotifikasjonView;
