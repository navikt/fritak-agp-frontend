const mockFetch = (status: number, json: any) => {
  vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      status: status,
      json: () => Promise.resolve(json)
    } as unknown as Response)
  );
};

export default mockFetch;
