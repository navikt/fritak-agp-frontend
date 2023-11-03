import ParseExpiryDate from './ParseExpiryDate';
import timezone_mock from 'timezone-mock';

timezone_mock.register('Europe/London');

describe('ParseExpiryDate', () => {
  it('should return vintertid', () => {
    expect(ParseExpiryDate('2021-01-15T14:26:35.000+00:00')).toEqual(new Date('2021-01-15 14:26:35'));
  });
});
