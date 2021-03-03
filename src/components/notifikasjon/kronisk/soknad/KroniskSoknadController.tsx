import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

export const KroniskSoknadController = () => (
  <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />
);
