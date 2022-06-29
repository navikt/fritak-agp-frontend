import { Selector } from 'testcafe';

fixture`Enkeltinnsending`.page('https://arbeidsgiver.nav.no/fritak-agp/nb/kronisk/soknad');

test('Bli videresendt til minid loginsiden', async (t) => {
  await t.expect(Selector('html').textContent).contains('VELFERDSETATEN');
});
