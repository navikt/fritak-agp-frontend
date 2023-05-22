import { translateUrl } from './translateUrl';

describe('LanguageContext', () => {
  const norsk = 'http://localhost:3000/grensekomp/nb/innsending?bedrift=123';
  const engelsk = 'http://localhost:3000/grensekomp/en/innsending?bedrift=123';

  it('skal vise oversette til engelsk', () => {
    expect(translateUrl(norsk, 'en')).toContain(engelsk);
  });

  it('skal vise oversette til norsk', () => {
    expect(translateUrl(engelsk, 'nb')).toContain(norsk);
  });
});
