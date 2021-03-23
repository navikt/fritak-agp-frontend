import React from 'react';

const formatArbeidstype = (arbeidstyper: string[]) =>
  arbeidstyper.map((arbeidstype) => <li key={arbeidstype}>{arbeidstype.toLowerCase()}</li>);

export default formatArbeidstype;
