const leaderboard = [];

const leaderboardReducer = (state = leaderboard, action) => {
  switch (action.type) {
    case "SET_LEADERBOARD":
      console.log(action);
      state = action.data;
      break;

    default:
      return state;
  }
  return state;
};

export default leaderboardReducer;
