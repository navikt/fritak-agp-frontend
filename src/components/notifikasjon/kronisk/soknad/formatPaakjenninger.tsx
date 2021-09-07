import React from 'react';
import textPaakjenninger from './tekstPaakjenninger';

const formatPaakjenninger = (paakjenninger: string[], beskrivelse: string | undefined) =>
  paakjenninger.map((paakjenning) => (
    <li key={paakjenning}>
      {textPaakjenninger[paakjenning] || paakjenning.toLowerCase()}
      {paakjenning === 'ANNET' ? ' "' + beskrivelse + '"' : ''}
    </li>
  ));

export default formatPaakjenninger;
