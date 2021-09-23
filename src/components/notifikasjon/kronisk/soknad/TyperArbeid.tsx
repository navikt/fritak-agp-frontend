import React from 'react';
import tekstArbeidstype from './tekstArbeidstype';

interface TyperArbeidProps {
  arbeidstyper?: string[];
}

const TyperArbeid = (props: TyperArbeidProps) => {
  if (!props.arbeidstyper) {
    return null;
  }

  return (
    <ul className='dash'>
      {props.arbeidstyper.map((arbeidstype) => (
        <li key={arbeidstype}>{tekstArbeidstype[arbeidstype] || arbeidstype.toLowerCase()}</li>
      ))}
    </ul>
  );
};

export default TyperArbeid;
