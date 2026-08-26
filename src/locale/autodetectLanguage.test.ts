import { autodetectLanguage } from './autodetectLanguage';
import { Language } from './Language';

describe('autodetectLanguage', () => {
  it.each([
    ['http://localhost:3000/fritak-agp/en/innsending', Language.en],
    ['http://localhost:3000/fritak-agp/nb/innsending', Language.nb],
    ['http://localhost:3000/fritak-agp/innsending', Language.nb]
  ])('should detect %s for URL %s', (url: string, expectedLanguage: Language) => {
    expect(autodetectLanguage(url)).toBe(expectedLanguage);
  });

  it('should return Language.nb when URL only contains "en" without slashes around it', () => {
    const url = 'http://localhost:3000/fritak-agp/endemic/innsending';
    expect(autodetectLanguage(url)).toBe(Language.nb);
  });

  it('should return Language.en when URL contains /en/ and has query params', () => {
    const url = 'http://localhost:3000/fritak-agp/en/innsending?bedrift=123';
    expect(autodetectLanguage(url)).toBe(Language.en);
  });

  it('should return Language.nb for an empty string', () => {
    expect(autodetectLanguage('')).toBe(Language.nb);
  });
});
