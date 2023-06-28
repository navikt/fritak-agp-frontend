import { GetLoginExpiry } from './LoginExpiryAPI';
import { ParseExpiryDate } from './ParseExpiryDate';
import timezone_mock from 'timezone-mock';

timezone_mock.register('Europe/London');

describe('loginExpiryAPI', () => {
  it('should ParseExpiryDate with same timezone', async () => {
    expect(ParseExpiryDate('2020-01-23T08:27:57.125+0000')).toEqual(new Date(2020, 0, 23, 8, 27, 57, 125));
  });

  it('should ParseExpiryDate with timezone +2 hours', async () => {
    expect(ParseExpiryDate('2020-01-23T08:27:57.125+0200')).toEqual(new Date(2020, 0, 23, 6, 27, 57, 125));
  });

  it('should return status and a string when stuff is OK and it is a time string', async () => {
    const input = '2020-01-23T08:27:57.125+0000';
    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const loginExpiry = await GetLoginExpiry('');
    expect(loginExpiry.tidspunkt).toEqual(new Date(2020, 0, 23, 8, 27, 57, 125));
  });

  it('should return a status and empty string when endpoint is not found', async () => {
    const mockApi = Promise.resolve({
      status: 402,
      json: () => Promise.resolve()
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const loginExpiry = await GetLoginExpiry('');
    expect(loginExpiry.tidspunkt).toBeUndefined();
  });

  it('should return a status and empty string when endpoint is not authorized', async () => {
    const mockApi = Promise.resolve({
      status: 401,
      json: () => Promise.resolve()
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const loginExpiry = await GetLoginExpiry('');
    expect(loginExpiry.tidspunkt).toBeUndefined();
  });

  /**
   * @jest-environment jsdom
   */
  it('should return a status and empty string when endpoint has error', async () => {
    const mockApi = Promise.resolve({
      status: 500,
      json: () => Promise.resolve()
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const loginExpiry = await GetLoginExpiry('');
    expect(loginExpiry.tidspunkt).toBeUndefined();
  });
});
