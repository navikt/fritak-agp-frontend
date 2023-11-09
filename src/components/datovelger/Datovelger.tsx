import React, { useEffect } from 'react';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { isValid } from 'date-fns';

interface DatovelgerProps {
  onDateChange?: (val?: Date | undefined) => void;
  defaultSelected?: Date;
  toDate?: Date;
  fromDate?: Date;
  id?: string;
  label?: React.ReactNode;
  hideLabel?: boolean;
  disabled?: boolean;
  defaultMonth?: Date;
  error?: React.ReactNode;
  className?: string;
}

export default function Datovelger({
  onDateChange,
  defaultSelected,
  toDate,
  fromDate,
  id,
  label,
  hideLabel,
  disabled,
  defaultMonth,
  error,
  className
}: DatovelgerProps) {
  if (!defaultSelected || !isValid(defaultSelected)) {
    defaultSelected = undefined;
  }

  const { datepickerProps, inputProps, reset } = useDatepicker({
    toDate: toDate,
    fromDate: fromDate,
    onDateChange: onDateChange,
    defaultSelected: defaultSelected,
    defaultMonth: defaultMonth
  });

  useEffect(() => {
    if (typeof defaultSelected === 'undefined') {
      reset();
    }
  }, [defaultSelected]); // eslint-disable-line

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        label={label}
        id={id}
        hideLabel={hideLabel}
        disabled={disabled}
        error={error}
        className={className}
      />
    </DatePicker>
  );
}
