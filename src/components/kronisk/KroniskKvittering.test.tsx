import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import KroniskKvittering from './KroniskKvittering';

expect.extend(toHaveNoViolations);

describe('KroniskKvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    render(<KroniskKvittering />);

    expect(screen.getByText(/Kommer.../)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<KroniskKvittering />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
