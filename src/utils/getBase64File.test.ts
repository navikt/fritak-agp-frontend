import getBase64file from './getBase64File';

describe('getBase64file', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should resolve with the base64 data URL when FileReader succeeds', async () => {
    const mockResult = 'data:text/plain;base64,aGVsbG8=';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MockFileReader = vi.fn(function (this: any) {
      this.result = mockResult;
      this.onload = null;
      this.onerror = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.readAsDataURL = vi.fn(function (this: any) {
        setTimeout(() => {
          if (typeof this.onload === 'function') this.onload();
        }, 0);
      });
    });

    vi.stubGlobal('FileReader', MockFileReader);

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await getBase64file(file);
    expect(result).toBe(mockResult);
  });

  it('should reject when FileReader encounters an error', async () => {
    const mockError = new ProgressEvent('error');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MockFileReader = vi.fn(function (this: any) {
      this.result = null;
      this.onload = null;
      this.onerror = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.readAsDataURL = vi.fn(function (this: any) {
        setTimeout(() => {
          if (typeof this.onerror === 'function') this.onerror(mockError);
        }, 0);
      });
    });

    vi.stubGlobal('FileReader', MockFileReader);

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    await expect(getBase64file(file)).rejects.toEqual(mockError);
  });
});
