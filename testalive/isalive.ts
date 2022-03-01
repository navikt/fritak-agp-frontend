import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';

fixture`Enkeltinnsending`.page('https://arbeidsgiver.nav.no/fritak-agp/nb/kronisk/soknad').beforeEach(async () => {
  await waitForReact();
});

test('Bli videresendt til minid loginsiden', async (t) => {
  await t.expect(Selector('html').textContent).contains('BankID');
});
