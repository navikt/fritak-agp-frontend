import { render, screen } from '@testing-library/react';
import InnsendtAv from './InnsendtAv';

describe('InnsendtAv', () => {
  it('should format', () => {
    render(<InnsendtAv sendtAv={'Meg'}></InnsendtAv>);

    expect(screen.getByText('Innsendt av: Meg')).toBeTruthy();
  });
});
