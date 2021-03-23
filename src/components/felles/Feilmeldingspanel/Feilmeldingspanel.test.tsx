import React from 'react';
import Feilmeldingspanel from './Feilmeldingspanel';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Feilmeldingspanel', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<Feilmeldingspanel feilmeldinger={[]} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
