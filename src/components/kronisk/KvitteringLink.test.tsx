import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KvitteringLink from './KvitteringLink';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('KvitteringLink', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should have no a11y violations', async () => {
    const { container } = render(
      <Router history={makeHistory('/fritak-agp')}>
        <KvitteringLink />
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
