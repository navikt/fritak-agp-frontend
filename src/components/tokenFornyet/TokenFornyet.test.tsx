import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import TokenFornyet from './TokenFornyet';

expect.extend(toHaveNoViolations);

describe('TokenFornyet', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<TokenFornyet />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
