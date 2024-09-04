import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

export const KroniskKravSlettetController = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.KroniskKravSlettet} />
);
