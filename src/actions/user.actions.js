export const setCurrentUser = (user) => {
  return { type: "SET_USER", user };
};

export const getCurrentUser = () => {
  return { type: "GET_USER" };
};

export const setCurrentUserData = (userData) => {
  return { type: "SET_USER_DATA", userData };
};
export const setCurrentUserAccessToken = (accessToken) => {
  return { type: "SET_USER_ACCESS_TOKEN", accessToken };
};
