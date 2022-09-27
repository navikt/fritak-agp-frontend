import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KvitteringLink from './KvitteringLink';
import { MemoryRouter } from 'react-router-dom';

const initHistory = ['/fritak-agp'];

describe('KvitteringLink', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <KvitteringLink />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
