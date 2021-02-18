import ParseExpiryDate from './ParseExpiryDate';
import timezone_mock from 'timezone-mock';

timezone_mock.register('Europe/London');

describe('ParseExpiryDate', () => {
  it('should return av valid date', () => {
    const Result = ParseExpiryDate('2021-02-16T14:53:46.000+00:00');

    expect(Result).toEqual(new Date('2021-02-16T14:53:46.000+00:00'));
  });
});
