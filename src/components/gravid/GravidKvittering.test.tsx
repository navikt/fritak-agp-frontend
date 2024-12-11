import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GravidKvittering from './GravidKvittering';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

const initHistory = ['/'];

describe('GravidKvittering', () => {
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

  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <GravidKvittering />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
