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
    expect(formatOmplassering(Omplassering.IKKE_MULIG, 'MOTSETTER')).toEqual(
      'Omplassering til annen jobb er ikke mulig fordi den ansatte ønsker ikke omplassering'
    );
  });

  it('should format noe uforståelig om vi ikke kjenner teksten', () => {
    expect(formatOmplassering(Omplassering.IKKE_MULIG, 'DETTE_ER_UKJENT')).toEqual(
      'Omplassering til annen jobb er ikke mulig fordi dette er ukjent'
    );
  });

  it('should format empty', () => {
    expect(formatOmplassering('finnesikke', '')).toEqual('[Mangler data]');
  });
});
