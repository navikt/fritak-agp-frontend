import { autodetectLanguage } from './autodetectLanguage';
import { Language } from './Language';

describe('autodetectLanguage', () => {
  it('should return Language.en when URL contains /en/', () => {
    const url = 'http://localhost:3000/fritak-agp/en/innsending';
    expect(autodetectLanguage(url)).toBe(Language.en);
  });

  it('should return Language.nb when URL does not contain /en/', () => {
    const url = 'http://localhost:3000/fritak-agp/nb/innsending';
    expect(autodetectLanguage(url)).toBe(Language.nb);
  });

  it('should return Language.nb for a URL without any language segment', () => {
    const url = 'http://localhost:3000/fritak-agp/innsending';
    expect(autodetectLanguage(url)).toBe(Language.nb);
  });

  it('should return Language.nb when URL only contains "en" without slashes around it', () => {
    const url = 'http://localhost:3000/fritak-agp/endemic/innsending';
    expect(autodetectLanguage(url)).toBe(Language.nb);
  });

  it('should return Language.en when /en/ appears in query string path', () => {
    const url = 'http://localhost:3000/fritak-agp/en/innsending?bedrift=123';
    expect(autodetectLanguage(url)).toBe(Language.en);
  });

  it('should return Language.nb for an empty string', () => {
    expect(autodetectLanguage('')).toBe(Language.nb);
  });
});
