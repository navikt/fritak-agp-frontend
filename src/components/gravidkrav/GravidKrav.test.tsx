import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import GravidKrav from './GravidKrav';

describe('GravidKrav', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<GravidKrav />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
