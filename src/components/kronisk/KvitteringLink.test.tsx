import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KvitteringLink from './KvitteringLink';
import { BrowserRouter } from 'react-router-dom';

describe('KvitteringLink', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <BrowserRouter basename='fritak-agp'>
        <KvitteringLink />
      </BrowserRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
