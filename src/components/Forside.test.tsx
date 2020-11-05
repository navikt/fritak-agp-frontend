import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Forside', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<Forside />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
