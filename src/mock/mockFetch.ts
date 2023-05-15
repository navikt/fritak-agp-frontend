const mockFetch = (status: number, json: any) => {
  jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      status: status,
      json: () => Promise.resolve(json)
    } as unknown as Response)
  );
};

export default mockFetch;
