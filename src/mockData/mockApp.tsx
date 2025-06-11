import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { ApplicationRoutes } from '../ApplicationRoutes';
import { ArbeidsgiverProvider } from '../context/arbeidsgiver/ArbeidsgiverContext';
import HttpStatus from '../api/HttpStatus';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const mockApp = (children: any = ApplicationRoutes(), path = '/') => (
  <MemoryRouter initialEntries={[path]}>
    <ArbeidsgiverProvider arbeidsgivere={[]} status={HttpStatus.Successfully} baseUrl={''}>
      {children}
    </ArbeidsgiverProvider>
  </MemoryRouter>
);
