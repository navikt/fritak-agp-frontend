import { NotifikasjonState } from './state/NotifikasjonState';
import { NotifikasjonSpinner } from './felles/NotifikasjonSpinner';
import HttpStatus from '../../api/HttpStatus';
import { NotifikasjonUkjent } from './felles/NotifikasjonUkjent';
import NotifikasjonType from './felles/NotifikasjonType';
import NotifikasjonFeilmelding from './felles/NotifikasjonFeilmelding';
import GravidKravView from './gravid/krav/GravidKravView';
import GravidSoknadView from './gravid/soknad/GravidSoknadView';
import GravidKravSlettetView from './gravid/kravSlettet/GravidKravSlettetView';
import React from 'react';
import mapKravState from './utils/mapKravState';
import KroniskSoknadView from './kronisk/soknad/KroniskSoknadView';
import GravidKravVisning from '../../api/gravidkrav/GravidKravVisning';

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

        case NotifikasjonType.GravidKrav: {
          if (!state.gravidKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          const gravidKravState: GravidKravVisning = mapKravState(state.gravidKravResponse);
          return <GravidKravView gravidKravVisning={gravidKravState} />;
        }

        case NotifikasjonType.GravidKravSlettet: {
          if (!state.gravidKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          const gravidKravState: GravidKravVisning = mapKravState(state.gravidKravResponse);
          return <GravidKravSlettetView gravidKravVisning={gravidKravState} />;
        }

        case NotifikasjonType.KroniskSoknad:
          if (!state.kroniskSoknadResponse) {
            return <NotifikasjonFeilmelding />;
          }
          return <KroniskSoknadView kroniskSoknadResponse={state.kroniskSoknadResponse} />;

        case NotifikasjonType.KroniskKrav: {
          if (!state.kroniskKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          const kravState: GravidKravVisning = mapKravState(state.kroniskKravResponse);
          return <GravidKravView gravidKravVisning={kravState} />;
        }

        case NotifikasjonType.KroniskKravSlettet: {
          if (!state.kroniskKravResponse) {
            return <NotifikasjonFeilmelding />;
          }
          const kravState: GravidKravVisning = mapKravState(state.kroniskKravResponse);
          return <GravidKravSlettetView gravidKravVisning={kravState} />;
        }

        default:
          return <NotifikasjonFeilmelding />;
      }
    default:
      return <NotifikasjonFeilmelding />;
  }
};

export default NotifikasjonView;
