import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

const KroniskKravSlettetController = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.KroniskKravSlettet} />
);

export default KroniskKravSlettetController;
