import { render, screen } from '@testing-library/react';
import React from 'react';
import TyperArbeid from './TyperArbeid';

describe('TyperArbeid', () => {
  it('should print out the list of stuff', () => {
    const arbeidstyper = ['STILLESITTENDE', 'KREVENDE', 'MODERAT'];

    render(<TyperArbeid arbeidstyper={arbeidstyper} />);

    expect(screen.getByText(/Stillesittende arbeid/)).toBeInTheDocument();
    expect(screen.getByText(/Fysisk krevende arbeid/)).toBeInTheDocument();
    expect(screen.getByText(/Moderat fysisk arbeid/)).toBeInTheDocument();
  });

  it('should print out the list of stuff, including one not predefined', () => {
    const arbeidstyper = ['STILLESITTENDE', 'KREVENDE', 'NON_EXISTANT_TYPE'];

    render(<TyperArbeid arbeidstyper={arbeidstyper} />);

    expect(screen.getByText(/Stillesittende arbeid/)).toBeInTheDocument();
    expect(screen.getByText(/Fysisk krevende arbeid/)).toBeInTheDocument();
    expect(screen.getByText(/non existant type/)).toBeInTheDocument();
  });

  it('should not print anything', () => {
    const { container } = render(<TyperArbeid />);

    expect(container.firstChild).toBeNull();
  });
});
