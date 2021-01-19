import { formatFilesize } from './formatFilesize';

describe('formatFilesize', () => {
  it('should format Kb', () => {
    expect(formatFilesize(16000)).toEqual('16 KB');
    expect(formatFilesize(250000)).toEqual('250 KB');
    expect(formatFilesize(999000)).toEqual('999 KB');
  });

  it('should format Mb', () => {
    expect(formatFilesize(1000000)).toEqual('1.0 MB');
    expect(formatFilesize(2500000)).toEqual('2.5 MB');
    expect(formatFilesize(3456000)).toEqual('3.5 MB');
  });
});
