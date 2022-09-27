import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import React from 'react';
import { ApplicationRoutes } from '../ApplicationRoutes';

export const mockApp = (children: any = ApplicationRoutes(), path: string = '/') => (
  <MemoryRouter initialEntries={[path]}>
    <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
      {children}
    </ArbeidsgiverProvider>
  </MemoryRouter>
);
