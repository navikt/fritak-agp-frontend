import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';

describe('Forside', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(
      <BrowserRouter basename='fritak-agp'>
        <Forside />
      </BrowserRouter>
    );
    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
