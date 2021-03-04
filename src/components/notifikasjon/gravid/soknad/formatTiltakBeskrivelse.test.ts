import formatTiltakBeskrivelse from './formatTiltakBeskrivelse';

describe('formatTiltakBeskrivelse', () => {
  it('should format hjemmekontor', () => {
    expect(formatTiltakBeskrivelse('HJEMMEKONTOR', 'minbeskrivelse')).toEqual('hjemmekontor');
  });

  it('should format annet', () => {
    expect(formatTiltakBeskrivelse('ANNET', 'minbeskrivelse')).toEqual('annet: minbeskrivelse');
  });
});
