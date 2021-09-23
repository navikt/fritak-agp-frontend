import React from 'react';
import tekstPaakjenninger from './tekstPaakjenninger';

interface PaakjenningerProps {
  paakjenninger?: string[];
  beskrivelse?: string;
}

const Paakjenninger = (props: PaakjenningerProps) => {
  if (!props.paakjenninger) {
    return null;
  }

  return (
    <ul className='dash'>
      {props.paakjenninger.map((paakjenning) => (
        <li key={paakjenning}>
          {tekstPaakjenninger[paakjenning] || paakjenning.toLowerCase().replace(/_/g, ' ')}
          {paakjenning === 'ANNET' ? ` "${props.beskrivelse}"` : ''}
        </li>
      ))}
    </ul>
  );
};

export default Paakjenninger;
