import React from 'react';
import GravidFeil from './GravidFeil';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('GravidFeil', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<GravidFeil />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
