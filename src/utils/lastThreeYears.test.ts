import { lastThreeYears } from './lastThreeYears';

describe('lastThreeYears', () => {
  it('should list this year, and the two years before', () => {
    expect(lastThreeYears(2002)).toEqual([2000, 2001, 2002]);
  });
});
