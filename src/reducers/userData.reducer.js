const user = null;

const currentUserDataReducer = (state = user, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      state = action.userData;
      break;

    default:
      return state;
  }
  return state;
};

export default currentUserDataReducer;
