import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import KontrollsporsmaalLonn from './KontrollsporsmaalLonn';

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

describe('KontrollsporsmaalLonn', () => {
  it('should show the modal', () => {
    const mockCancel = jest.fn();
    const isOpen = true;
    const mockClose = jest.fn();

    render(<KontrollsporsmaalLonn onCancelClick={mockCancel} onClose={mockClose} isOpen={isOpen} />);

    expect(screen.getByText(/KONTROLLSPORSMAL_LONN_TITTEL/)).toBeInTheDocument();
  });

  it('should call the cancel method when cancel is clicked', () => {
    const mockCancel = jest.fn();
    const isOpen = true;
    const mockClose = jest.fn();

    render(<KontrollsporsmaalLonn onCancelClick={mockCancel} onClose={mockClose} isOpen={isOpen} />);

    const cancelLink = screen.getByText(/KONTROLLSPORSMAL_LONN_AVBRYT/);

    cancelLink.click();

    expect(mockCancel).toHaveBeenCalled();
  });

  it('should call the closeWithDays method with the number of days when days are entered and submit is clicked', () => {
    const mockCancel = jest.fn();
    const isOpen = true;
    const mockClose = jest.fn();

    render(<KontrollsporsmaalLonn onCancelClick={mockCancel} onClose={mockClose} isOpen={isOpen} />);

    const daysInput = screen.getByLabelText(/KONTROLLSPORSMAL_LONN_DAGER/);

    fireEvent.change(daysInput, { target: { value: '23' } });

    const submitButton = screen.getByText(/KONTROLLSPORSMAL_LONN_SEND/);

    submitButton.click();

    expect(mockClose).toHaveBeenCalledWith(23);
  });

  it('should have no a11y violations', async () => {
    const mockCancel = jest.fn();
    const isOpen = true;
    const mockClose = jest.fn();

    const rendered = render(<KontrollsporsmaalLonn onCancelClick={mockCancel} onClose={mockClose} isOpen={isOpen} />);

    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
