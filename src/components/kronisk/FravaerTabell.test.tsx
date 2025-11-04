import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import FravaerTabell from './FravaerTabell';
import '../../mockData/mockWindowLocation';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
        t: (str: string) => str
      }
    };
  }
}));

describe('FravaerTabell', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<FravaerTabell onChange={() => {}} validated={false} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
