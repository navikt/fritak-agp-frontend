import { mapGravidRequest } from './mapGravidRequest';
import { Tiltak } from '../../components/gravid/Tiltak';
import { Omplassering } from '../../components/gravid/Omplassering';
import { Aarsak } from '../../components/gravid/Aarsak';

describe('mapGravidRequest', () => {
  it('should not fail when fnr is 0', () => {
    expect(() => {
      mapGravidRequest(
        '0',
        '456',
        true,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        true
      );
    }).not.toThrow('');
  });

  it('should not fail when orgnr is 0', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        '0',
        true,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        true
      );
    }).not.toThrow('');
  });

  it('should fail when no fnr', () => {
    expect(() => {
      mapGravidRequest(
        undefined,
        '456',
        true,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        true
      );
    }).toThrow('');
  });
  it('should fail when no orgnr', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        undefined,
        true,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        true
      );
    }).toThrow('');
  });

  it('should fail when no tilrettelegge', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        '456',
        undefined,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        true
      );
    }).toThrow('');
  });

  it('should fail when no bekreft', () => {
    expect(() => {
      mapGravidRequest(
        '123',
        '456',
        true,
        [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
        'tiltakBeskrivelse',
        Omplassering.JA,
        Aarsak.FAAR_IKKE_KONTAKT,
        '',
        undefined
      );
    }).toThrow('Bekreft må spesifiseres');
  });

  it('should map all', () => {
    const request = mapGravidRequest(
      '123',
      '456',
      true,
      [Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER],
      'tiltakBeskrivelse',
      Omplassering.JA,
      Aarsak.FAAR_IKKE_KONTAKT,
      '',
      true
    );
    expect(request.fnr).toEqual('123');
    expect(request.orgnr).toEqual('456');
    expect(request.tilrettelegge).toEqual(true);
    expect(request.tiltak).toEqual([Tiltak.HJEMMEKONTOR, Tiltak.TILPASSEDE_ARBEIDSOPPGAVER]);
    expect(request.tiltakBeskrivelse).toEqual('tiltakBeskrivelse');
    expect(request.omplassering).toEqual(Omplassering.JA);
    expect(request.omplasseringAarsak).toEqual(Aarsak.FAAR_IKKE_KONTAKT);
    expect(request.bekreftet).toEqual(true);
  });
});
