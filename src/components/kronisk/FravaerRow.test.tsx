import React from 'react';
import { render, screen } from '@testing-library/react';

import FravaerRow from './FravaerRow';

describe('FravaerRow', () => {
  it('should display an input field', () => {
    render(
      <FravaerRow
        key='FravaerRow-2021-3'
        year={2019}
        month={3}
        thisMonth={2}
        thisYear={2021}
        fravaer={[]}
        onChange={jest.fn}
      />
    );

    expect(screen.getByText(/April 2019/)).toBeInTheDocument();
  });

  it('should display an empty field when displaying more than two years ago', () => {
    render(
      <FravaerRow
        key='FravaerRow-2021-3'
        year={2019}
        month={3}
        thisMonth={4}
        thisYear={2021}
        fravaer={[]}
        onChange={jest.fn}
      />
    );

    expect(screen.getByTestId('empty-month')).toBeInTheDocument();
  });

  it('should display an input field when displaying more than two years ago and the same month as the current two years ago', () => {
    render(
      <FravaerRow
        key='FravaerRow-2021-3'
        year={2019}
        month={3}
        thisMonth={3}
        thisYear={2021}
        fravaer={[]}
        onChange={jest.fn}
      />
    );

    expect(screen.getByText(/April 2019/)).toBeInTheDocument();
  });
});
