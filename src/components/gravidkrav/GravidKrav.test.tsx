import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { axe } from 'jest-axe';

import GravidKrav from './GravidKrav';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';

describe('GravidKrav', () => {
  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <ArbeidsgiverProvider baseUrl={''}>
              <GravidKrav />
            </ArbeidsgiverProvider>
          </MemoryRouter>
        ))
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
