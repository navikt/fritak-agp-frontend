import { createMemoryHistory } from 'history';

export const mockHistory = (path: string) => {
  const history = createMemoryHistory();
  history.push(path);
  return history;
};
