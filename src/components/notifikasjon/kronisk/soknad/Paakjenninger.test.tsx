import { render, screen } from '@testing-library/react';
import React from 'react';
import Paakjenninger from './Paakjenninger';

describe('Paakjenninger', () => {
  it('should print out the list of stuff', () => {
    const paakjenninger = [
      'ALLERGENER',
      'UKOMFORTABEL',
      'STRESSENDE',
      'REGELMESSIG',
      'GAAING',
      'HARDE',
      'TUNGE',
      'ANNET'
    ];

    render(<Paakjenninger paakjenninger={paakjenninger} beskrivelse='Cheese' />);

    expect(screen.getByText(/Allergener eller giftstoffer/)).toBeInTheDocument();
    expect(screen.getByText(/Ukomfortabel temperatur eller luftfuktighet/)).toBeInTheDocument();
    expect(screen.getByText(/Stressende omgivelser/)).toBeInTheDocument();
    expect(screen.getByText(/Regelmessige kveldsskift eller nattskift/)).toBeInTheDocument();
    expect(screen.getByText('Mye gåing/ståing')).toBeInTheDocument();
    expect(screen.getByText(/Harde gulv/)).toBeInTheDocument();
    expect(screen.getByText(/Tunge løft/)).toBeInTheDocument();
    expect(screen.getByText(/Annet: /)).toBeInTheDocument();
    expect(screen.getByText(/"Cheese"/)).toBeInTheDocument();
  });

  it('should print out unknown stuff', () => {
    const paakjenninger = ['NOT_DEFINED_PAAKJENNING'];

    render(<Paakjenninger paakjenninger={paakjenninger} beskrivelse='Cheese' />);

    expect(screen.getByText(/not defined paakjenning/)).toBeInTheDocument();
  });

  it('should not print anything', () => {
    const { container } = render(<Paakjenninger />);

    expect(container.firstChild).toBeNull();
  });
});
