import React from 'react';
import EksempelLonningsdager from './EksempelLonningsdager';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('EksempelLonningsdager', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<EksempelLonningsdager />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });

  it('skal vise eksempler', () => {
    render(<EksempelLonningsdager />);

    expect(screen.getByText(/20% fast stilling pluss ekstravakter/)).toBeInTheDocument();
  });
});
