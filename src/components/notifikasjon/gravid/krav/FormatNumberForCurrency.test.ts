import formatNumberForCurrency from './FormatNumberForCurrency';

describe('formatNumberForCurrency', () => {
  it('should format a whole number as NOK currency', () => {
    const result = formatNumberForCurrency(1000);
    expect(result).toContain('1');
    expect(result).toContain('000');
    expect(result.toLowerCase()).toContain('kr');
  });

  it('should format a decimal number with two fraction digits', () => {
    const result = formatNumberForCurrency(1234.5);
    expect(result).toContain('1');
    expect(result).toContain('234');
    expect(result).toMatch(/1[,\s.]?234/);
  });

  it('should format zero as currency', () => {
    const result = formatNumberForCurrency(0);
    expect(result).toContain('0');
    expect(result.toLowerCase()).toContain('kr');
  });

  it('should format a negative number', () => {
    const result = formatNumberForCurrency(-500);
    expect(result).toContain('500');
    expect(result).toContain('-');
  });

  it('should format a large number with grouping separators', () => {
    const result = formatNumberForCurrency(1000000);
    expect(result).toContain('1');
    expect(result).toContain('000');
  });

  it('should always include two minimum fraction digits', () => {
    const result = formatNumberForCurrency(42);
    expect(result).toMatch(/,00|\.00/);
  });
});
