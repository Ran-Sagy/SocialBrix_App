const user = {};

const currentUserReducer = (state = user, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.user;
      break;
    case "SET_USER_ACCESS_TOKEN":
      state.accessToken = action.accessToken;
      break;

    default:
      return state;
  }
  return state;
};

export default currentUserReducer;
