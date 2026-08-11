import tekstTiltak from './tekstTiltak';

describe('tekstTiltak', () => {
  it('should have a TILPASSET_ARBEIDSTID key with the correct text', () => {
    expect(tekstTiltak.TILPASSET_ARBEIDSTID).toBe('Tilpasset arbeidstid');
  });

  it('should have a HJEMMEKONTOR key with the correct text', () => {
    expect(tekstTiltak.HJEMMEKONTOR).toBe('Hjemmekontor');
  });

  it('should have a TILPASSEDE_ARBEIDSOPPGAVER key with the correct text', () => {
    expect(tekstTiltak.TILPASSEDE_ARBEIDSOPPGAVER).toBe('Tilpassede arbeidsoppgaver');
  });

  it('should have an ANNET key with the correct text', () => {
    expect(tekstTiltak.ANNET).toBe('Annet');
  });

  it('should have exactly 4 keys', () => {
    expect(Object.keys(tekstTiltak)).toHaveLength(4);
  });
});
