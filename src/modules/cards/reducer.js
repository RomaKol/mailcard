const initialState = {
  isLoading: false,
  array: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CARDS/DELETE_REQUEST':
      return {...state, isLoading: true};
    case 'CARDS/DELETE_FAILURE':
      return {...state, isLoading: false};
    case 'CARDS/DELETE_SUCCESS':
      return {...state, isLoading: false, array: [...payload.newArray]};

    case 'CARDS/RESET':
      return initialState;

    default:
      return state;
  }
};

export default reducer;