import Aarsfravaer from './Aarsfravaer';
import { isAarsFravaerEmpty } from './isAarsFravaerEmpty';

describe('isAarsFravaerEmpty', () => {
  const fravaer = [
    {
      year: 2019
    },
    {
      year: 2020,
      jan: 3,
      feb: 4,
      mar: 5
    } as Aarsfravaer,
    {
      year: 2021,
      jan: 7,
      feb: 8,
      mar: 9
    } as Aarsfravaer,
    {
      year: 2022,
      okt: 10,
      nov: 11,
      des: 12
    } as Aarsfravaer
  ];

  it('should be empty', () => {
    expect(isAarsFravaerEmpty(fravaer[0])).toBe(true);
  });

  it('should not be empty', () => {
    expect(isAarsFravaerEmpty(fravaer[1])).toBe(false);
  });
});
