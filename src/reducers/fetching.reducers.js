const fetching = false;

const currentUserReducer = (state = fetching, action) => {
  switch (action.type) {
    case "SET_FETCHING":
      state = action.bool;
      return state;
    default:
      return state;
  }
};

export default currentUserReducer;
