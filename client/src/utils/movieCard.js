import _truncate from 'lodash/truncate';

const DEFAULT_OVERVIEW_LENGTH = 220;
const DEFAULT_SEPERATOR = /[.,]? +/;

export function truncateOverview(
  overview = '',
  { length = DEFAULT_OVERVIEW_LENGTH, separator = DEFAULT_SEPERATOR } = {}
) {
  return _truncate(overview, { length, separator });
}
