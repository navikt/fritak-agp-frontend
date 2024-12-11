import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import TokenFornyet from './TokenFornyet';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('TokenFornyet', () => {
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
      <div>
        <MemoryRouter>
          <TokenFornyet />
        </MemoryRouter>
      </div>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
