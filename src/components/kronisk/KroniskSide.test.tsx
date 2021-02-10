import React from 'react';
import KroniskSide from './KroniskSide';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

const mockResponse = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse
    },
    assign: mockResponse
  },
  writable: true
});

describe('KroniskSide', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<KroniskSide />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
