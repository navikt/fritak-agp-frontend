import React from 'react';
import Dato from './Dato';
import timezone_mock from 'timezone-mock';
import { render, screen } from '@testing-library/react';

describe('Dato', () => {
  timezone_mock.register('Europe/London');

  it('should format the dato', () => {
    const dato = new Date(2022, 11, 24, 11, 24, 0);
    render(<Dato dato={dato} />);

    expect(screen.findByText(/24.12.22/)).toBeTruthy();
  });
});
