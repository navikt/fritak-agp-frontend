import { datoToString, parseDateTilDato, parseDato } from './Dato';
import timezone_mock from 'timezone-mock';
describe('datoToString', () => {
  it('should map datoToString', () => {
    expect(datoToString(parseDato('05.10.2020'))).toBe('2020-10-05');
    expect(datoToString(parseDato('6.2.2020'))).toBe('2020-02-06');
  });

  it('should not map datoToString', () => {
    expect(() => {
      datoToString(parseDato(''));
    }).toThrowError();
    expect(() => {
      datoToString(parseDato('55.01.2020'));
    }).toThrowError();
    expect(() => {
      datoToString(parseDato('55.aa.2020'));
    }).toThrowError();
  });

  it('should not map when missing values', () => {
    expect(() => {
      datoToString({
        month: 1,
        day: 5
      });
    }).toThrowError();
    expect(() => {
      datoToString({
        year: 2020,
        day: 5
      });
    }).toThrowError();
    expect(() => {
      datoToString({
        year: 2020,
        month: 1
      });
    }).toThrowError();
    expect(() => {
      datoToString({});
    }).toThrowError();
  });
});

describe('dato', () => {
  it('should parse dato', () => {
    expect(parseDato('05.10.2020').error).toBeUndefined();
    expect(parseDato('05.10.2020').day).toBe(5);
    expect(parseDato('05.10.2020').month).toBe(10);
    expect(parseDato('05.10.2020').year).toBe(2020);
  });

  it('should parse dato correct values', () => {
    expect(parseDato('01.01.2021').day).toBe(1);
    expect(parseDato('31.01.2021').day).toBe(31);
    expect(parseDato('32.01.2020').error).toBe('Ugyldig dato');
  });

  it('should parse dato with single values', () => {
    expect(parseDato('5.10.2020').error).toBeUndefined();
    expect(parseDato('5.10.2020').day).toBe(5);
    expect(parseDato('30.9.2020').month).toBe(9);
  });

  it('should not parse illegal format', () => {
    expect(parseDato('05-10-2020').error).toBe('Ugyldig datoformat');
    expect(parseDato('2020-10-05').error).toBe('Ugyldig datoformat');
  });

  it('should not allow invalid values', () => {
    expect(parseDato('01.13.2020').error).toBe('Ugyldig måned');
    expect(parseDato('00.12.2020').error).toBe('Ugyldig dato');
    expect(parseDato('01.00.2020').error).toBe('Ugyldig måned');
    expect(parseDato('35.01.2020').error).toBe('Ugyldig dato');
  });

  it('should parse date til dato', () => {
    timezone_mock.register('Europe/London');

    expect(parseDateTilDato(new Date('2020-06-05 12:00:00'))).toEqual({
      day: 5,
      millis: 1591354800000,
      month: 6,
      value: '05.06.2020',
      year: 2020
    });
  });
});
