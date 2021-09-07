import React from 'react';
import tekstPaakjenninger from './tekstPaakjenninger';

const formatPaakjenninger = (paakjenninger: string[], beskrivelse: string | undefined) =>
  paakjenninger.map((paakjenning) => (
    <li key={paakjenning}>
      {tekstPaakjenninger[paakjenning] || paakjenning.toLowerCase()}
      {paakjenning === 'ANNET' ? ' "' + beskrivelse + '"' : ''}
    </li>
  ));

export default formatPaakjenninger;
