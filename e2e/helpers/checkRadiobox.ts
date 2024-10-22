export default async function checkRadiobox(page: any, label: string, status: string) {
  return page.getByRole('group', { name: label }).getByLabel(status).check();
}
