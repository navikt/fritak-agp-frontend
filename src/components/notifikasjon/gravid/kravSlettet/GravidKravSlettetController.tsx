import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

export const GravidKravSlettetController = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidKravSlettet} />
);
