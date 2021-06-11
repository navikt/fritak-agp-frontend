import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Application } from './App';
import { Router } from 'react-router-dom';
import mockHistory from './mockData/mockHistory';

describe('Application.a11y', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <Router history={mockHistory('/fritak-agp')}>
        <Application />
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
