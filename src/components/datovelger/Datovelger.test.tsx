import { fireEvent, render, screen } from '@testing-library/react';
import Datovelger from './Datovelger';

describe('Datovelger', () => {
  it('does not overwrite a loaded date on mount', () => {
    const onDateChange = vi.fn();
    const date = new Date(2024, 1, 29);

    render(<Datovelger label='Dato' defaultSelected={date} onDateChange={onDateChange} />);

    expect(screen.getByLabelText('Dato')).toHaveValue('29.02.2024');
    expect(onDateChange).not.toHaveBeenCalled();
    expect(date.getTime()).toBe(new Date(2024, 1, 29).getTime());
  });

  it('keeps invalid input and distinguishes it from an empty field', () => {
    const onDateChange = vi.fn();
    const { rerender } = render(<Datovelger label='Dato' onDateChange={onDateChange} />);
    const input = screen.getByLabelText('Dato');

    fireEvent.change(input, { target: { value: '31.02.2024' } });

    expect(onDateChange).toHaveBeenLastCalledWith(undefined, 'invalid');
    rerender(<Datovelger label='Dato' onDateChange={onDateChange} />);
    expect(input).toHaveValue('31.02.2024');

    fireEvent.change(input, { target: { value: '' } });

    expect(onDateChange).toHaveBeenLastCalledWith(undefined, undefined);
  });

  it('reports a valid date after invalid input is corrected', () => {
    const onDateChange = vi.fn();
    render(<Datovelger label='Dato' onDateChange={onDateChange} />);
    const input = screen.getByLabelText('Dato');

    fireEvent.change(input, { target: { value: '29.02.2023' } });
    expect(onDateChange).toHaveBeenLastCalledWith(undefined, 'invalid');

    fireEvent.change(input, { target: { value: '29.02.2024' } });

    expect(onDateChange).toHaveBeenLastCalledWith(new Date(2024, 1, 29), undefined);
    expect(input).toHaveValue('29.02.2024');
  });

  it.each([
    { value: '31.12.2023', error: 'beforeMin' },
    { value: '01.01.2025', error: 'afterMax' }
  ])('reports $error for $value', ({ value, error }) => {
    const onDateChange = vi.fn();
    render(
      <Datovelger
        label='Dato'
        fromDate={new Date(2024, 0, 1)}
        toDate={new Date(2024, 11, 31)}
        onDateChange={onDateChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Dato'), { target: { value } });

    expect(onDateChange).toHaveBeenLastCalledWith(undefined, error);
  });
});
