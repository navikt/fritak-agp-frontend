import getBase64file from './getBase64File';

describe('getBase64file', () => {
  it('should resolve with the base64 data URL when FileReader succeeds', async () => {
    const mockResult = 'data:text/plain;base64,aGVsbG8=';

    const mockFileReaderInstance = {
      readAsDataURL: vi.fn(),
      result: mockResult,
      onload: null as unknown,
      onerror: null as unknown
    };

    mockFileReaderInstance.readAsDataURL = vi.fn(function (this: typeof mockFileReaderInstance) {
      this.result = mockResult;
      setTimeout(() => {
        if (typeof this.onload === 'function') this.onload();
      }, 0);
    });

    vi.spyOn(globalThis, 'FileReader').mockImplementation(
      () => mockFileReaderInstance as unknown as FileReader
    );

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await getBase64file(file);
    expect(result).toBe(mockResult);

    vi.restoreAllMocks();
  });

  it('should reject when FileReader encounters an error', async () => {
    const mockError = new ProgressEvent('error');

    const mockFileReaderInstance = {
      readAsDataURL: vi.fn(),
      result: null,
      onload: null as unknown,
      onerror: null as unknown
    };

    mockFileReaderInstance.readAsDataURL = vi.fn(function (this: typeof mockFileReaderInstance) {
      setTimeout(() => {
        if (typeof this.onerror === 'function') this.onerror(mockError);
      }, 0);
    });

    vi.spyOn(globalThis, 'FileReader').mockImplementation(
      () => mockFileReaderInstance as unknown as FileReader
    );

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    await expect(getBase64file(file)).rejects.toEqual(mockError);

    vi.restoreAllMocks();
  });
});
