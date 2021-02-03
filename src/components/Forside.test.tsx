import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Forside', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should have no a11y violations', async () => {
    const rendered = render(
      <Router history={makeHistory('/')}>
        <Forside />
      </Router>
    );
    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
