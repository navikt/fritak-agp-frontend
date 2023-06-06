import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { ApplicationRoutes } from '../ApplicationRoutes';
import { ArbeidsgiverProvider } from '../context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from '../context/arbeidsgiver/ArbeidsgiverStatus';

export const mockApp = (children: any = ApplicationRoutes(), path: string = '/') => (
  <MemoryRouter initialEntries={[path]}>
    <ArbeidsgiverProvider arbeidsgivere={[]} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
      {children}
    </ArbeidsgiverProvider>
  </MemoryRouter>
);
