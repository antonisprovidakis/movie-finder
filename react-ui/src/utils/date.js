/**
 * @param {string} dateString e.g. '2019-01-31'
 * @param {string} locale e.g. 'en-US'
 * @returns {string} e.g. 'January 31, 2019'
 */
export function formatDate(dateString, locale = 'en-US') {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}
