import React, { useRef } from 'react';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { isValid } from 'date-fns';
import type { DateInputError } from '../../utils/dato/Dato';

interface DatovelgerProps {
  onDateChange?: (val?: Date, inputError?: DateInputError) => void;
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

  const selectedDate = useRef(defaultSelected);
  const { datepickerProps, inputProps } = useDatepicker({
    toDate: toDate,
    fromDate: fromDate,
    onDateChange: (date) => {
      selectedDate.current = date;
    },
    onValidate: (validation) => {
      let inputError: DateInputError | undefined;
      if (!validation.isEmpty) {
        if (validation.isBefore) {
          inputError = 'beforeMin';
        } else if (validation.isAfter) {
          inputError = 'afterMax';
        } else if (!validation.isValidDate) {
          inputError = 'invalid';
        }
      }
      onDateChange?.(selectedDate.current, inputError);
    },
    defaultSelected: defaultSelected,
    defaultMonth: defaultMonth
  });

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
