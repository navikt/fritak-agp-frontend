import { lastThreeYears } from './lastThreeYears';

describe('lastThreeYears', () => {
  it('should not allow negative numbers', () => {
    expect(lastThreeYears(2002)).toEqual([2000, 2001, 2002]);
  });
});
