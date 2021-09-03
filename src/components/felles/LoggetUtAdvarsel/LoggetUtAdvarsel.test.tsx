import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';
import { Router } from 'react-router-dom';
import mockHistory from '@navikt/helse-arbeidsgiver-felles-frontend/dist/mock/mockHistory';

describe('LoggetUtAdvarsel', () => {
  it('should display the modal if the token is invalid', () => {
    render(
      <Router history={mockHistory('/')}>
        <LoggetUtAdvarsel onClose={jest.fn()} loginServiceUrl={''} tokenFornyet={''} />
      </Router>
    );
    expect(screen.getByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data')).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockCallback = jest.fn();
    render(
      <Router history={mockHistory('/')}>
        <LoggetUtAdvarsel onClose={mockCallback} loginServiceUrl={''} tokenFornyet={''} />
      </Router>
    );
    const closeLink = screen.getByText('Jeg har logget inn på nytt - lukk dette vinduet');
    expect(screen.getByText('Logg inn på nytt i ID-porten.')).toBeInTheDocument();
    fireEvent.click(closeLink);
    expect(mockCallback).toHaveBeenCalled();
  });
});
