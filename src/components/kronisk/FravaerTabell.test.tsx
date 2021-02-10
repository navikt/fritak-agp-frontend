import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import FravaerTabell from './FravaerTabell';

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
describe('FravaerTabell', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<FravaerTabell onChange={() => {}} validated={false} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
