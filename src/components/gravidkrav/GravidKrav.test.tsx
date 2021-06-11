import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import GravidKrav from './GravidKrav';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';

describe('GravidKrav', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <ArbeidsgiverProvider baseUrl={''}>
          <GravidKrav />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
