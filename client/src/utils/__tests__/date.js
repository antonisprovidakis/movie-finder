import { formatDate } from '../date';

// Testing only in en-US locale as node is not shpped with internationalization
it('should format simple date string (2019-01-31) to locale date string (January 31, 2019)', () => {
  expect(formatDate('2019-01-31')).toBe('January 31, 2019');
  expect(formatDate('2018-05-10')).toBe('May 10, 2018');
});
