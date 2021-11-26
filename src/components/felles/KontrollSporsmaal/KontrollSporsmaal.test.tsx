import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import KontrollSporsmaal from './KontrollSporsmaal';

jest.mock('react-i18next', () => ({
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

describe('KontrollSporsmaal', () => {
  it('should have no a11y violations', async () => {
    const mockCallback = jest.fn();

    const { container } = render(<KontrollSporsmaal onChange={mockCallback} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no a11y violations when there is an error', async () => {
    const mockCallback = jest.fn();

    const { container } = render(<KontrollSporsmaal onChange={mockCallback} feil='FEIL!' />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should show the error', async () => {
    const mockCallback = jest.fn();

    render(<KontrollSporsmaal onChange={mockCallback} feil='FEIL!' />);

    expect(screen.getByText('FEIL!')).toBeInTheDocument();
  });

  it('should show the id', async () => {
    const mockCallback = jest.fn();

    render(<KontrollSporsmaal onChange={mockCallback} feil='FEIL!' id='ikkerandomid' />);

    screen.getByLabelText('KONTROLLSPORSMAL_DAGER_LABEL');

    const input = screen.getByLabelText('KONTROLLSPORSMAL_DAGER_LABEL');

    expect(input.getAttribute('id')).toEqual('ikkerandomid');
  });
});
