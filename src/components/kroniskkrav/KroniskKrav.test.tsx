import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import KroniskKrav from './KroniskKrav';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';

describe('KroniskKrav', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <ArbeidsgiverProvider>
          <KroniskKrav />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
