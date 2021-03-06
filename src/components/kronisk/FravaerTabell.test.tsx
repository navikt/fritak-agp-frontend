import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import FravaerTabell from './FravaerTabell';
import '../../mockData/mockWindowLocation';

describe('FravaerTabell', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<FravaerTabell onChange={() => {}} validated={false} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
