import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

const initHistory = ['/'];

describe('LoggetUtAdvarsel', () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = vi.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    });
  });

  it('should display the modal if the token is invalid', () => {
    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoggetUtAdvarsel onClose={vi.fn()} loginServiceUrl={''} tokenFornyet={''} />
      </MemoryRouter>
    );
    expect(screen.getByText('LOGGET_UT_ADVARSEL_LOGGET_UT')).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockCallback = vi.fn();
    render(
      <MemoryRouter initialEntries={initHistory}>
        <LoggetUtAdvarsel onClose={mockCallback} loginServiceUrl={''} tokenFornyet={''} />
      </MemoryRouter>
    );
    const closeLink = screen.getByText('LOGGET_UT_ADVARSEL_LOGIN');
    expect(screen.getByText('LOGGET_UT_ADVARSEL_LOGGET_UT')).toBeInTheDocument();
    fireEvent.click(closeLink);
    expect(mockCallback).toHaveBeenCalled();
  });
});
