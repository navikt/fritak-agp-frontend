import { lastThreeYears } from './lastThreeYears';

describe('lastThreeYears', () => {
  it('should list this year, and the tree years before', () => {
    expect(lastThreeYears(2002)).toEqual([1999, 2000, 2001, 2002]);
  });
});
