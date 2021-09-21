import tekstTiltak from './tekstTiltak';

const formatTiltakBeskrivelse = (tiltak: string, beskrivelse: string | undefined) => {
  if (tiltak === 'ANNET') {
    beskrivelse = beskrivelse || '';
    return tekstTiltak[tiltak] + ': ' + beskrivelse;
  }
  let tiltakstekst = tekstTiltak[tiltak];

  if (!tiltakstekst) {
    tiltakstekst = (tiltak || '').split('_').join(' ').toLowerCase(); // Helt avhenging av at backend serverer noe fornuftig
    tiltakstekst = tiltakstekst || ' ';
    tiltakstekst = (tiltakstekst[0].toUpperCase() + tiltakstekst.slice(1)).trim();
  }

  return tiltakstekst;
};

export default formatTiltakBeskrivelse;
