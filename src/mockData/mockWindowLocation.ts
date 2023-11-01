const mockWindowLocationResponse = vi.fn();

Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockWindowLocationResponse,
      includes: mockWindowLocationResponse
    },
    assign: mockWindowLocationResponse
  },
  writable: true
});

export {};
