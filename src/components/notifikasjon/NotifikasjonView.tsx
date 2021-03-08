import { NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonSpinner } from './felles/NotifikasjonSpinner';
import HttpStatus from '../../api/HttpStatus';
import { NotifikasjonUkjent } from './felles/NotifikasjonUkjent';
import NotifikasjonType from './felles/NotifikasjonType';
import NotifikasjonFeilmelding from './felles/NotifikasjonFeilmelding';
import GravidKravView from './gravid/krav/GravidKravView';
import React from 'react';

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
          return <GravidKravView gravidSoknadResponse={state.gravidSoknadResponse} />;

        case NotifikasjonType.GravidKrav:
          if (!state.gravidSoknadResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <GravidKravView gravidSoknadResponse={state.gravidSoknadResponse} />;
        default:
          return <NotifikasjonFeilmelding />;
      }
    default:
      return <NotifikasjonFeilmelding />;
  }
};

export default NotifikasjonView;
