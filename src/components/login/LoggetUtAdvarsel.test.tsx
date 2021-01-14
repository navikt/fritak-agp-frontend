import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';

describe('LoggetUtAdvarsel', () => {
  it('should display the modal if the token is invalid', () => {
    render(<LoggetUtAdvarsel onClose={jest.fn()} />);

    expect(
      screen.getByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      )
    ).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockCallback = jest.fn();
    render(<LoggetUtAdvarsel onClose={mockCallback} />);

    const closeLink = screen.getByText(/Jeg har logget inn på nytt/);
    expect(
      screen.getByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      )
    ).toBeInTheDocument();

    fireEvent.click(closeLink);

    expect(mockCallback).toHaveBeenCalled();
  });
});
