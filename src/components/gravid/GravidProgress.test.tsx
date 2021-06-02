import React from 'react';
import GravidProgress from './GravidProgress';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('GravidProgress', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<GravidProgress />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
