const formatTiltakBeskrivelse = (tiltak: string, beskrivelse: string) => {
  if (tiltak === 'ANNET') {
    return tiltak.toLowerCase() + ': ' + beskrivelse;
  }
  return tiltak.toLowerCase().replace('_', ' ');
};

export default formatTiltakBeskrivelse;
