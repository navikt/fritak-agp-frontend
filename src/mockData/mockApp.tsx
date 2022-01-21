import { Router } from 'react-router-dom';
import {
  ArbeidsgiverProvider,
  ArbeidsgiverStatus,
  LoginStatus,
  LoginProvider
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import React from 'react';
import mockHistory from './mockHistory';
import { ApplicationRoutes } from '../ApplicationRoutes';

export const mockApp = (
  children: any = ApplicationRoutes(),
  path: string = '/',
  loginStatus: LoginStatus = LoginStatus.Verified
) => (
  <Router history={mockHistory(path)}>
    <LoginProvider baseUrl='/base' status={loginStatus} loginServiceUrl='/loginServiceUrl'>
      <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
        {children}
      </ArbeidsgiverProvider>
    </LoginProvider>
  </Router>
);
