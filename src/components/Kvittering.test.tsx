import '@testing-library/jest-dom';
import React from 'react'
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Kvittering from "./Kvittering";

expect.extend(toHaveNoViolations);

describe('Kvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    render(
      <Kvittering />
    );

    expect(screen.getByText(/Kommer.../)).toBeInTheDocument();
  })


  it('should have no a11y violations', async () => {
    const { container } = render(
      <Kvittering />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
