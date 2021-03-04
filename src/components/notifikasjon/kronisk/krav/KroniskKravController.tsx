import NotifikasjonType from '../../felles/NotifikasjonType';
import React from 'react';
import NotifikasjonController from '../../NotifikasjonController';

export const KroniskKravController = () => <NotifikasjonController notifikasjonType={NotifikasjonType.GravidSoknad} />;
