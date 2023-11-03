import React from 'react';
import { render, screen } from '@testing-library/react';

import FravaerRow from './FravaerRow';

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

describe('FravaerRow', () => {
  it('should display an input field', () => {
    render(
      <table>
        <tbody>
          <tr>
            <FravaerRow
              key='FravaerRow-2021-3'
              year={2019}
              month={3}
              thisMonth={2}
              thisYear={2021}
              fravaer={[]}
              onChange={vi.fn}
            />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText(/April 2019/)).toBeInTheDocument();
  });

  it('should display an empty field when displaying more than two years ago', () => {
    render(
      <table>
        <tbody>
          <tr>
            <FravaerRow
              key='FravaerRow-2021-3'
              year={2019}
              month={3}
              thisMonth={4}
              thisYear={2021}
              fravaer={[]}
              onChange={vi.fn}
            />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByTestId('empty-month')).toBeInTheDocument();
  });

  it('should display an input field when displaying more than two years ago and the same month as the current two years ago', () => {
    render(
      <table>
        <tbody>
          <tr>
            <FravaerRow
              key='FravaerRow-2021-3'
              year={2019}
              month={3}
              thisMonth={3}
              thisYear={2021}
              fravaer={[]}
              onChange={vi.fn}
            />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText(/April 2019/)).toBeInTheDocument();
  });
});
