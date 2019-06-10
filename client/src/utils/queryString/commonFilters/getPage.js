import { parseQueryString } from '../base';
import { MIN_PAGE, MAX_PAGE } from '../../../api/config/constants/page';

export default function getPage(queryString, fallbackPage = MIN_PAGE) {
  if (fallbackPage < MIN_PAGE || fallbackPage > MAX_PAGE) {
    throw new Error(
      `'fallbackPage' must be between MIN_PAGE: ${MIN_PAGE} and MAX_PAGE: ${MAX_PAGE}`
    );
  }

  const { page: pageString } = parseQueryString(queryString);
  const page = parseInt(pageString, 10);

  if (isNaN(page) || page < MIN_PAGE || page === 0 || page > MAX_PAGE) {
    return fallbackPage;
  }

  return page;
}
