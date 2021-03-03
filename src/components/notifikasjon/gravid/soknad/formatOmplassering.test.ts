import formatOmplassering from './formatOmplassering';
import { Omplassering } from '../../../gravid/Omplassering';

describe('formatOmplassering', () => {
  it('should format ja', () => {
    expect(formatOmplassering(Omplassering.JA, '')).toEqual('Omplassering til annen jobb er forsøkt');
  });

  it('should format nei', () => {
    expect(formatOmplassering(Omplassering.NEI, '')).toEqual('Omplassering til annen jobb er ikke forsøkt');
  });

  it('should format ikke mulig', () => {
    expect(formatOmplassering(Omplassering.IKKE_MULIG, 'grunnen her')).toEqual(
      'Omplassering til annen jobb er ikke mulig fordi grunnen her'
    );
  });

  it('should format empty', () => {
    expect(formatOmplassering('finnesikke', '')).toEqual('[Mangler data]');
  });
});
