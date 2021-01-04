import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import DagerTabell from './DagerTabell';

describe('DagerTabell', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<DagerTabell onChange={() => {}} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
