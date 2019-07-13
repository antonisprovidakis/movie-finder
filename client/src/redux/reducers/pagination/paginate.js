// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, checkIfNeedsToRun = action => true }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof checkIfNeedsToRun !== 'function') {
    throw new Error('Expected checkIfNeedsToRun to be a function.');
  }

  const [requestType, successType, failureType] = types;

  const updatePagination = (state, action) => {
    const newState = {
      ...state,
      pages: {
        ...state.pages,
        [action.options.page]: updatePage(
          state.pages[action.options.page],
          action
        )
      }
    };

    if (action.type === successType) {
      newState.totalPages = action.response.pagination.total_pages;
    }

    return newState;
  };

  const updatePage = (
    state = {
      isFetching: false,
      ids: [],
      error: null
    },
    action
  ) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: action.response.data.result
        };
      case failureType:
        return {
          ...state,
          isFetching: false,
          error: action.error
        };
      default:
        return state;
    }
  };

  return (state = { totalPages: undefined, pages: {} }, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const shouldRun = checkIfNeedsToRun(action);
        if (typeof shouldRun !== 'boolean') {
          throw new Error('Expected shouldRun to be a boolean.');
        }

        if (!shouldRun) {
          return state;
        }

        return updatePagination(state, action);
      default:
        return state;
    }
  };
};

export default paginate;
