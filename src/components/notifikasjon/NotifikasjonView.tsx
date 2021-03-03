import { NotifikasjonState } from './NotifikasjonState';
import { NotifikasjonSpinner } from './NotifikasjonSpinner';
import HttpStatus from '../../api/HttpStatus';
import { NotifikasjonUkjent } from './NotifikasjonUkjent';
import NotifikasjonType from './NotifikasjonType';
import NotifikasjonFeilmelding from './NotifikasjonFeilmelding';
import GravidSoknadView from './gravid/GravidSoknadView';
import React from 'react';

const NotifikasjonView = (state: NotifikasjonState) => {
  switch (state.status) {
    case undefined:
      return <NotifikasjonSpinner />;
    case HttpStatus.NotFound:
      return <NotifikasjonUkjent />;
    case HttpStatus.Successfully:
      switch (state.notifikasjonType) {
        case NotifikasjonType.GravidSoknad:
          if (!state.gravidSoknadResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <GravidSoknadView gravidSoknadResponse={state.gravidSoknadResponse} />;
        default:
          return <NotifikasjonFeilmelding />;
      }
    default:
      return <NotifikasjonFeilmelding />;
  }
};

export default NotifikasjonView;
