import { validateGravidKrav } from './validateGravidKrav';
import { defaultGravidKravState } from './GravidKravState';
import { parseDato } from '../../utils/dato/Dato';
import { i18n } from 'i18next';

const translationMock = {
  t: (param: any) => param
};

describe('validateGravidKrav', () => {
  it('should show fnr error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show orgnr error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should show fra error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    if (state.perioder) {
      state.perioder = [
        {
          uniqueKey: 'unik1',
          perioder: [
            {
              fom: parseDato('12.12.2014'),
              uniqueKey: 'unik'
            }
          ]
        }
      ];
    }

    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);

    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid', perioder: [{ uniqueKey: 'uuid2' }] }];

    expect(state2.perioder[0].perioder[0].fomError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    if (state.perioder) {
      state.perioder = [
        {
          uniqueKey: 'unik1',
          perioder: [
            {
              fom: parseDato('12.12.2014'),
              tom: parseDato('11.11.2014'),
              uniqueKey: 'unik'
            }
          ]
        }
      ];
    }
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid', perioder: [{ uniqueKey: 'uuid2' }] }];
    expect(state2.perioder[0].perioder[0].tomError).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidKravState();
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid', perioder: [{ uniqueKey: 'uuid2' }] }];
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.perioder[0].perioder[0].fomError).toBeUndefined();
    expect(state2.perioder[0].perioder[0].tomError).toBeUndefined();
    expect(state2.perioder[0].dagerError).toBeUndefined();
    expect(state2.perioder[0].belopError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
