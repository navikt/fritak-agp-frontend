import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

const GravidKravSlettetController = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidKravSlettet} />
);

export default GravidKravSlettetController;
