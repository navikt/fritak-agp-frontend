import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Application } from './App';
import { Router } from 'react-router-dom';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { mockHistory } from './mockData/mockHistory';

describe('Application.a11y', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <EnvironmentProvider loginServiceUrl={''} sideTittel={''} basePath={''}>
        <Router history={mockHistory('/fritak-agp')}>
          <Application />
        </Router>
      </EnvironmentProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
