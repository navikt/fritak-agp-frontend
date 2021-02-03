import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Application } from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';

describe('Application.a11y', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should have no a11y violations', async () => {
    const { container } = render(
      <EnvironmentProvider loginServiceUrl={''} sideTittel={''} basePath={''}>
        <Router history={makeHistory('/fritak-agp')}>
          <Application />
        </Router>
      </EnvironmentProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
