import React from 'react';
import Endre from './Endre';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Endre', () => {
  it('should show a link to the change form for gravid krav', () => {
    render(
      <MemoryRouter>
        <Endre kravtype='gravidKrav' />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/nb/gravid/krav');
  });

  it('should show a link to the change form for kronisk krav', () => {
    render(
      <MemoryRouter>
        <Endre kravtype='kroniskKrav' />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/nb/kronisk/krav');
  });
});
