import { NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonSpinner } from './felles/NotifikasjonSpinner';
import HttpStatus from '../../api/HttpStatus';
import { NotifikasjonUkjent } from './felles/NotifikasjonUkjent';
import NotifikasjonType from './felles/NotifikasjonType';
import NotifikasjonFeilmelding from './felles/NotifikasjonFeilmelding';
import GravidKravView from './gravid/krav/GravidKravView';
import GravidSoknadView from './gravid/soknad/GravidSoknadView';

import React from 'react';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import adaptKravState from './utils/adaptKravState';

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

        case NotifikasjonType.KroniskKrav:
          if (!state.kroniskKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          const kravState: GravidKravResponse = adaptKravState(state.kroniskKravResponse);
          return <GravidKravView gravidKravResponse={kravState} />;

        case NotifikasjonType.GravidKrav:
          if (!state.gravidKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <GravidKravView gravidKravResponse={state.gravidKravResponse} />;
        default:
          return <NotifikasjonFeilmelding />;
      }
    default:
      return <NotifikasjonFeilmelding />;
  }
};

export default NotifikasjonView;
