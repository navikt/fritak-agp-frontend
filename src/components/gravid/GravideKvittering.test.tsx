import '@testing-library/jest-dom';
import React from 'react'
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GravidKvittering from "./GravidKvittering";

describe('GravidKvittering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <GravidKvittering />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
