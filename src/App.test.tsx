import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import App from './App';
import { MemoryRouter } from 'react-router-dom';

expect.extend(toHaveNoViolations);

describe('App', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
