import mapLocales from './mapLocales';
import LangKey from './LangKey';

describe('mapLocales', () => {
  it('should map all language keys', () => {
    const langs = mapLocales('nb');
    for (const k in LangKey) {
      expect(langs[k]).not.toBeUndefined();
    }
  });
});
