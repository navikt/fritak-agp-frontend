import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const makeHistory = createMemoryHistory({
  initialEntries: ['/']
});

describe('App.a11y', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <Router history={makeHistory}>
        <App />
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
