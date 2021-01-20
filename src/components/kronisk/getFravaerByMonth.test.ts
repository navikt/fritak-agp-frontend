import Aarsfravaer from './Aarsfravaer';
import { getFravaerByMonth } from './getFravaerByMonth';

describe('getFravaerByMonth', () => {
  const fravaer = [
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

  it('should find month', () => {
    expect(getFravaerByMonth(2020, 0, fravaer)).toEqual(3);
    expect(getFravaerByMonth(2020, 1, fravaer)).toEqual(4);
    expect(getFravaerByMonth(2020, 2, fravaer)).toEqual(5);

    expect(getFravaerByMonth(2022, 9, fravaer)).toEqual(10);
    expect(getFravaerByMonth(2022, 10, fravaer)).toEqual(11);
    expect(getFravaerByMonth(2022, 11, fravaer)).toEqual(12);
  });

  it('should handle undefined', () => {
    expect(getFravaerByMonth(2021, 0)).toBeUndefined();
  });

  it('should handle empty array', () => {
    expect(getFravaerByMonth(2021, 0, [])).toBeUndefined();
  });

  it('should not find non existing year', () => {
    expect(getFravaerByMonth(2030, 0, fravaer)).toBeUndefined();
  });

  it('should not find empty month', () => {
    expect(getFravaerByMonth(2020, 11, fravaer)).toBeUndefined();
  });
});
