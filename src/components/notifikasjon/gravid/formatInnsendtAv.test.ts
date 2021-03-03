import formatInnsendtAv from './formatInnsendtAv';

describe('formatInnsendtAv', () => {
  it('should format', () => {
    expect(formatInnsendtAv('Meg')).toEqual('Innsendt av: Meg');
  });
});
