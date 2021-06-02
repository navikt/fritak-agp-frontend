import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str
      }
    };
  }
}));

describe('LoggetUtAdvarsel', () => {
  it('should display the modal if the token is invalid', () => {
    render(<LoggetUtAdvarsel onClose={jest.fn()} />);

    expect(screen.getByText(/ADVARSEL_TEKST/)).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockCallback = jest.fn();
    render(<LoggetUtAdvarsel onClose={mockCallback} />);

    const closeLink = screen.getByText(/LOGGET_UT_ADVARSEL_LUKK/);
    expect(screen.getByText(/ADVARSEL_TEKST/)).toBeInTheDocument();

    fireEvent.click(closeLink);

    expect(mockCallback).toHaveBeenCalled();
  });
});
