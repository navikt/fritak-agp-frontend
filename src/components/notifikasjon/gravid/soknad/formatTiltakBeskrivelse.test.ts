import formatTiltakBeskrivelse from './formatTiltakBeskrivelse';

describe('formatTiltakBeskrivelse', () => {
  it('should format hjemmekontor', () => {
    expect(formatTiltakBeskrivelse('HJEMMEKONTOR', 'minbeskrivelse')).toEqual('Hjemmekontor');
  });

  it('should format annet', () => {
    expect(formatTiltakBeskrivelse('ANNET', 'minbeskrivelse')).toEqual('Annet: minbeskrivelse');
  });
});
