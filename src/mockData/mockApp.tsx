import { Router } from 'react-router-dom';
import { ArbeidsgiverProvider, ArbeidsgiverStatus, LoginStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import React from 'react';
import mockHistory from './mockHistory';
import { ApplicationRoutes } from '../ApplicationRoutes';

export const mockApp = (
  children: any = ApplicationRoutes(),
  path: string = '/',
  loginStatus: LoginStatus = LoginStatus.Verified
) => (
  <Router history={mockHistory(path)}>
    <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
      {children}
    </ArbeidsgiverProvider>
  </Router>
);
