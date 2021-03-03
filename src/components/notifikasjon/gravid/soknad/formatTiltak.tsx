import formatTiltakBeskrivelse from './formatTiltakBeskrivelse';
import React from 'react';

const formatTiltak = (tiltak: string[], tiltakBeskrivelse: string) => (
  <ul>
    {tiltak.map((t) => (
      <li key={t}>{formatTiltakBeskrivelse(t, tiltakBeskrivelse)}</li>
    ))}
  </ul>
);

export default formatTiltak;
