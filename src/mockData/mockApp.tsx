import { Router } from 'react-router-dom';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import React from 'react';
import { LoginProvider } from '../context/login/LoginContext';
import { LoginStatus } from '../context/login/LoginStatus';
import { mockHistory } from './mockHistory';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { ApplicationRoutes } from '../ApplicationRoutes';
import testOrganisasjoner from './testOrganisasjoner';

export const mockApp = (
  children: any = ApplicationRoutes(),
  path: string = '/',
  loginStatus: LoginStatus = LoginStatus.Verified,
  arbeidsgivere: Array<Organisasjon> = testOrganisasjoner
) => (
  <Router history={mockHistory(path)}>
    <LoginProvider baseUrl='/base' status={loginStatus} loginServiceUrl='/loginServiceUrl'>
      <ArbeidsgiverProvider arbeidsgivere={[]} status={Status.Successfully}>
        {children}
      </ArbeidsgiverProvider>
    </LoginProvider>
  </Router>
);
