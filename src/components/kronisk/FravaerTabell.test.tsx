import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import FravaerTabell from './FravaerTabell';

describe('FravaerTabell', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<FravaerTabell onChange={() => {}} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
