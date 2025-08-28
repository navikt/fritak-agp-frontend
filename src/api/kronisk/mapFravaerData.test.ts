import { mapFravaerData } from './mapFravaerData';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

describe('mapFravaerData', () => {
  it('should fail when empty', () => {
    expect(mapFravaerData([])).toEqual([]);
  });

  it('should map Fravaer', () => {
    const fravaer = Array<Aarsfravaer>();
    fravaer.push({
      year: 2020,
      jan: 1,
      mar: 3,
      des: 12
    } as Aarsfravaer);
    const data = mapFravaerData(fravaer);
    expect(data[0].antallDagerMedFravaer).toEqual(1);
    expect(data[0].yearMonth).toEqual('2020-01');
    expect(data[1].antallDagerMedFravaer).toEqual(3);
    expect(data[1].yearMonth).toEqual('2020-03');
    expect(data[2].antallDagerMedFravaer).toEqual(12);
    expect(data[2].yearMonth).toEqual('2020-12');
  });

  it('should not include undefined', () => {
    const fravaer = Array<Aarsfravaer>();
    fravaer.push({
      year: 2020,
      jan: 1,
      mar: 3,
      des: 12
    } as Aarsfravaer);
    fravaer.push({
      year: 2021,
      apr: undefined
    } as Aarsfravaer);
    const data = mapFravaerData(fravaer);
    expect(data.length).toEqual(4);
    expect(data[0].antallDagerMedFravaer).toEqual(1);
    expect(data[0].yearMonth).toEqual('2020-01');
    expect(data[1].antallDagerMedFravaer).toEqual(3);
    expect(data[1].yearMonth).toEqual('2020-03');
    expect(data[2].antallDagerMedFravaer).toEqual(12);
    expect(data[2].yearMonth).toEqual('2020-12');
  });
});
