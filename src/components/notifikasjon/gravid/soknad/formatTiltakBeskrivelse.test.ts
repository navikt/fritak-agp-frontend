import formatTiltakBeskrivelse from './formatTiltakBeskrivelse';

describe('formatTiltakBeskrivelse', () => {
  it('should format hjemmekontor', () => {
    expect(formatTiltakBeskrivelse('HJEMMEKONTOR', 'minbeskrivelse')).toEqual('Hjemmekontor');
  });

  it('should format hjemmekontor with beskrivelse set to undefined', () => {
    expect(formatTiltakBeskrivelse('HJEMMEKONTOR', undefined)).toEqual('Hjemmekontor');
  });

  it('should format annet', () => {
    expect(formatTiltakBeskrivelse('ANNET', 'minbeskrivelse')).toEqual('Annet: minbeskrivelse');
  });

  it('should format annet også med bare et param', () => {
    expect(formatTiltakBeskrivelse('ANNET', undefined)).toEqual('Annet: ');
  });

  it('should format CRAZY_FROG to Crazy frog', () => {
    expect(formatTiltakBeskrivelse('CRAZY_FROG', undefined)).toEqual('Crazy frog');
  });

  it('should format "" to ""', () => {
    expect(formatTiltakBeskrivelse('', undefined)).toEqual('');
  });
});
