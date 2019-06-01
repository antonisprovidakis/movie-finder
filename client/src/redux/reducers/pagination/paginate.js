// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey = () => '' }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  const updatePagination = (state = {
    isFetching: false,
    totalPages: undefined,
    pages: {}
  }, action) => {
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
          totalPages: action.response.pagination.total_pages,
          pages: {
            ...state.pages,
            [action.response.pagination.page]: action.response.data.result
          }
        };
      case failureType:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state;
    }
  }


  return (state = {}, action) => {
    // Update pagination by key, if it exists
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        if (key) {
          return {
            ...state,
            [key]: updatePagination(state[key], action),
          };
        }
        else {
          return updatePagination(state, action);
        }
      default:
        return state;
    }
  }
}

export default paginate;
