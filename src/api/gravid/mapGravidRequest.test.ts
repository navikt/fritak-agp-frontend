import { mapGravidRequest } from './mapGravidRequest';

describe('mapGravidRequest', () => {
  it('should fail when no fnr', () => {
    expect(() => {
      mapGravidRequest(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    }).toThrow('');
  });
  it('should fail when no orgnr', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    }).toThrow('');
  });

  it('should fail when no tilrettelegge', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        '123',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    }).toThrow('');
  });

  it('should fail when no bekreft', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        '123',
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    }).toThrow('Bekreft må spesifiseres');
  });

  it('should map', () => {
    const request = mapGravidRequest(
      '123',
      '456',
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );
    expect(request.fnr).toEqual('123');
    expect(request.orgnr).toEqual('456');
    expect(request.tilrettelegge).toEqual(true);
    expect(request.bekreftet).toEqual(true);
  });
});
