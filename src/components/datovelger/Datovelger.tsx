import React, { useEffect } from 'react';
import { DateValidationT, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
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
  onValidate?: (val: DateValidationT) => void;
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
  error
}: DatovelgerProps) {
  if (!defaultSelected || !isValid(defaultSelected)) {
    defaultSelected = undefined;
  }

  const { datepickerProps, inputProps, reset } = UNSAFE_useDatepicker({
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
    <UNSAFE_DatePicker {...datepickerProps}>
      <UNSAFE_DatePicker.Input
        {...inputProps}
        label={label}
        id={id}
        hideLabel={hideLabel}
        disabled={disabled}
        error={error}
      />
    </UNSAFE_DatePicker>
  );
}
