import formatTilrettelegge from './formatTilrettelegge';

describe('formatTilrettelegge', () => {
  it('should format true', () => {
    expect(formatTilrettelegge(true)).toEqual('Tilrettelegging av arbeidsdagen er forsøkt');
  });

  it('should format false', () => {
    expect(formatTilrettelegge(false)).toEqual('Tilrettelegging av arbeidsdagen er ikke forsøkt');
  });
});
