import React from 'react';
import tekstArbeidstype from './tekstArbeidstype';

const formatArbeidstype = (arbeidstyper: string[] | undefined) => {
  if (!arbeidstyper) {
    return null;
  }

  return arbeidstyper.map((arbeidstype) => (
    <li key={arbeidstype}>{tekstArbeidstype[arbeidstype] || arbeidstype.toLowerCase()}</li>
  ));
};

export default formatArbeidstype;
