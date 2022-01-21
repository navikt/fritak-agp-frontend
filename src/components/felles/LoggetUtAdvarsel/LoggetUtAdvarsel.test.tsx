import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';
import { MemoryRouter } from 'react-router-dom';

describe('LoggetUtAdvarsel', () => {
  it('should display the modal if the token is invalid', () => {
    render(
      <MemoryRouter>
        <LoggetUtAdvarsel onClose={jest.fn()} loginServiceUrl={''} tokenFornyet={''} />
      </MemoryRouter>
    );
    expect(screen.getByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data')).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockCallback = jest.fn();
    render(
      <MemoryRouter>
        <LoggetUtAdvarsel onClose={mockCallback} loginServiceUrl={''} tokenFornyet={''} />
      </MemoryRouter>
    );
    const closeLink = screen.getByText('Jeg har logget inn på nytt - lukk dette vinduet');
    expect(screen.getByText('Logg inn på nytt i ID-porten.')).toBeInTheDocument();
    fireEvent.click(closeLink);
    expect(mockCallback).toHaveBeenCalled();
  });
});
