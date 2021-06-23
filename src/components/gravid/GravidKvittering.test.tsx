import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GravidKvittering from './GravidKvittering';
import { Router } from 'react-router-dom';
import mockHistory from '../../mockData/mockHistory';

describe('GravidKvittering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <Router history={mockHistory('/')}>
        <GravidKvittering />
      </Router>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
