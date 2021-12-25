export const setFetchingStage = (bool) => {
  return { type: "SET_FETCHING", bool };
};

export const isFatching = () => {
  return { type: "IS_FETCHING" };
};
