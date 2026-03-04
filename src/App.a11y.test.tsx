import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Application } from './App';
import { MemoryRouter } from 'react-router-dom';
import HttpStatus from './api/HttpStatus';

const initHistory = ['/nb/'];

describe('Application.a11y', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <Application arbeidsgiverStatus={HttpStatus.Successfully} />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
