import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import SelectDager from './SelectDager';

describe('SelectDager', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<SelectDager label='test' />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
