import gravidSoknadOmplassering from './gravidSoknadOmplassering';

describe('gravidSoknadOmplassering', () => {
  it('should have a MOTSETTER key with the correct text', () => {
    expect(gravidSoknadOmplassering.MOTSETTER).toBe('den ansatte ønsker ikke omplassering');
  });

  it('should have a FAAR_IKKE_KONTAKT key with the correct text', () => {
    expect(gravidSoknadOmplassering.FAAR_IKKE_KONTAKT).toBe('vi får ikke kontakt med den ansatte.');
  });

  it('should have a IKKE_ANDRE_OPPGAVER key with the correct text', () => {
    expect(gravidSoknadOmplassering.IKKE_ANDRE_OPPGAVER).toBe(
      'vi ikke har andre oppgaver eller arbeidssteder å tilby.'
    );
  });

  it('should have a HELSETILSTANDEN key with the correct text', () => {
    expect(gravidSoknadOmplassering.HELSETILSTANDEN).toBe(
      'den ansatte vil ikke fungere i en annen jobb på grunn av helsetilstanden.'
    );
  });

  it('should have exactly 4 keys', () => {
    expect(Object.keys(gravidSoknadOmplassering)).toHaveLength(4);
  });
});
