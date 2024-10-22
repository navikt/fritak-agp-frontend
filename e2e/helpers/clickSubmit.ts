export default async function clickButton(page: any, text: string) {
  return page.getByRole('button', { name: text }).dispatchEvent('click');
}
