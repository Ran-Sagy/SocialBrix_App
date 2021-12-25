import { createStore, combineReducers } from "redux";
import currentUserReducer from "../reducers/user.reducers";
import fetchingReducer from "../reducers/fetching.reducers";
import leaderboardReducer from "../reducers/leaderboard.reducers";
import currentUserDataReducer from "../reducers/userData.reducer";

const configureStore = () => {
  return createStore(
    combineReducers({
      currentUser: currentUserReducer,
      currentUserData: currentUserDataReducer,
      fetching: fetchingReducer,
      leaderboard: leaderboardReducer,
    })
  );
};

export default configureStore;
