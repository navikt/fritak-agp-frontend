import { Router } from 'react-router-dom';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import React from 'react';
import mockHistory from './mockHistory';
import { ApplicationRoutes } from '../ApplicationRoutes';

export const mockApp = (children: any = ApplicationRoutes(), path: string = '/') => (
  <Router history={mockHistory(path)}>
    <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
      {children}
    </ArbeidsgiverProvider>
  </Router>
);
