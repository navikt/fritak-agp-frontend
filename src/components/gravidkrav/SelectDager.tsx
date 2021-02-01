import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const SelectDager = (props) => {
  const keyUuid = uuidv4();
  const dager: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <Select {...props}>
      {dager.map((dag) => (
        <option key={keyUuid + '-' + dag} value={dag}>
          {dag}
        </option>
      ))}
    </Select>
  );
};

export default SelectDager;
