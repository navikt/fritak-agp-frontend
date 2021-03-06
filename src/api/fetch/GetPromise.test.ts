import GetPromise from './GetPromise';
import mockFetch from '../../mockData/mockFetch';

describe('mapGravidRequest', () => {
  const API_PATH = '';

  it('should handle 200', async () => {
    mockFetch(200, { user: 'human' });
    await expect(GetPromise(API_PATH)).resolves.toEqual({ json: { user: 'human' }, status: 200 });
  });

  it('should handle 404', async () => {
    mockFetch(404, {});
    await expect(GetPromise(API_PATH)).rejects.toEqual({
      status: 404,
      json: {}
    });
  });

  it('should handle 500', async () => {
    mockFetch(500, {});
    await expect(GetPromise(API_PATH)).rejects.toEqual({
      status: 500,
      json: {}
    });
  });

  it('should handle 505', async () => {
    mockFetch(505, {});
    await expect(GetPromise(API_PATH)).rejects.toEqual({
      status: 505,
      json: {}
    });
  });

  it('should handle 422', async () => {
    mockFetch(422, { user: 'human' });
    await expect(GetPromise(API_PATH)).resolves.toEqual({ json: { user: 'human' }, status: 422 });
  });
});
