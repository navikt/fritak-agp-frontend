import React from 'react';

const formatPaakjenninger = (paakjenninger: string[], beskrivelse: string | undefined) =>
  paakjenninger.map((paakjenning) => (
    <li key={paakjenning}>
      {paakjenning.toLowerCase()}
      {paakjenning === 'ANNET' ? ' "' + beskrivelse + '"' : ''}
    </li>
  ));

export default formatPaakjenninger;
