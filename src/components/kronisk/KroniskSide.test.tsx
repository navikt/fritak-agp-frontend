import React from 'react';
import KroniskSide from './KroniskSide';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('KroniskSide', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<KroniskSide />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
