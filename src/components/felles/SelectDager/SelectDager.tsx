import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectProps } from '@navikt/ds-react';

interface SelectDagerProps extends Omit<SelectProps, 'children'> {}

const SelectDager = (props: SelectDagerProps) => {
  const keyUuid = uuidv4();
  const dager: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <Select {...props}>
      {dager.map((dag) => (
        <option key={keyUuid + '-' + dag} value={dag}>
          {dag ? dag : '-'}
        </option>
      ))}
    </Select>
  );
};

export default SelectDager;
