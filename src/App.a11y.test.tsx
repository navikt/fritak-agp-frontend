import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Application } from './App';
import { MemoryRouter } from 'react-router-dom';

const initHistory = ['/fritak-agp'];

describe('Application.a11y', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <Application />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
