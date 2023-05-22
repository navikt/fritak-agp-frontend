import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import TokenFornyet from './TokenFornyet';
import { MemoryRouter } from 'react-router-dom';

describe('TokenFornyet', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <div>
        <MemoryRouter>
          <TokenFornyet />
        </MemoryRouter>
      </div>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
