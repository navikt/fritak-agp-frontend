import { createMemoryHistory } from 'history';

const mockHistory = (path: string) => {
  const history = createMemoryHistory();
  history.push(path);
  return history;
};

export default mockHistory;
