import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultGravidKravState } from './GravidKravState';
import mapGravidKravFeilmeldinger from './mapGravidKravFeilmeldinger';

describe('mapGravidKravFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'periode.fom',
    'periode.tom',
    'periode.antallDagerMedRefusjon',
    'periode.beloep',
    'bekreftet',
    'dokumentasjon',
    'perioder'
  ];

  it('should map all violations', () => {
    const state = defaultGravidKravState();
    state.perioder = [
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' },
      { uniqueKey: '1' }
    ];
    const feilmeldinger = mapGravidKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.perioder).not.toBeUndefined();
    // @ts-ignore
    expect(state.perioder[2].fomError).not.toBeUndefined();
    // @ts-ignore
    expect(state.perioder[3].tomError).not.toBeUndefined();
    // @ts-ignore
    expect(state.perioder[4].dagerError).not.toBeUndefined();
    // @ts-ignore
    expect(state.perioder[5].beloepError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();
    // @ts-ignore
    expect(state.perioder[8].dagerError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(9);
    expect(feilmeldinger[0].skjemaelementId).toEqual('ansatteFeilmeldingId');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra-dato-1');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til-dato-1');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager-1');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep-1');
    expect(feilmeldinger[6].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[8].skjemaelementId).toEqual('dager-1');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
