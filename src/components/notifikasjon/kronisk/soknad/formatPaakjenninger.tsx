import React from 'react';
import tekstPaakjenninger from './tekstPaakjenninger';

const formatPaakjenninger = (paakjenninger: string[] | undefined, beskrivelse: string | undefined) => {
  if (!paakjenninger) {
    return null;
  }

  return paakjenninger.map((paakjenning) => (
    <li key={paakjenning}>
      {tekstPaakjenninger[paakjenning] || paakjenning.toLowerCase()}
      {paakjenning === 'ANNET' ? ' "' + beskrivelse + '"' : ''}
    </li>
  ));
};

export default formatPaakjenninger;
