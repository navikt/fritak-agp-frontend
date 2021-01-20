import { formatFilesize } from './formatFilesize';

describe('formatFilesize', () => {
  it('should format Kb', () => {
    expect(formatFilesize(16 * 1024)).toEqual('16 KB');
    expect(formatFilesize(250 * 1024)).toEqual('250 KB');
    expect(formatFilesize(990 * 1024)).toEqual('990 KB');
  });

  it('should format Mb', () => {
    expect(formatFilesize(1000 * 1024)).toEqual('1.0 MB');
    expect(formatFilesize(2500 * 1024)).toEqual('2.5 MB');
    expect(formatFilesize(3500 * 1024)).toEqual('3.5 MB');
  });
});
