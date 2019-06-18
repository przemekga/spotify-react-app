import { combineReducers } from "redux";
import playlistsReducer from "./playlistsReducer";
import playbackReducer from "./playbackReducer";

export default combineReducers({
  playlistsReducer,
  playbackReducer
});
