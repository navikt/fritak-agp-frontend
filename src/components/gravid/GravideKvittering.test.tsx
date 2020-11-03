import '@testing-library/jest-dom';
import React from 'react'
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GravidKvittering from "./GravidKvittering";

expect.extend(toHaveNoViolations);

describe('GravidKvittering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <GravidKvittering />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
