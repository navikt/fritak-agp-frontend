import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GravidKvittering from './GravidKvittering';
import { MemoryRouter } from 'react-router-dom';

const initHistory = ['/'];

describe('GravidKvittering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <GravidKvittering />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
