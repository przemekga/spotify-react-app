// import { combineReducers } from "redux";
// import playlistsReducer from "./playlistsReducer";
// import playbackReducer from "./playbackReducer";

// const rootReducer = combineReducers({
//   playlistsReducer,
//   playbackReducer
// })

const initState = {
  token: "",
  isPlaying: false,
  songChanged: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token
      };
    case "STOP_PLAYBACK":
      return {
        ...state,
        isPlaying: false
      };
    case "START_PLAYBACK":
      return {
        ...state,
        isPlaying: true
      };
    case "SONG_HAS_CHANGED":
      return {
        ...state,
        songChanged: !state.songChanged
      }
    default:
      return state;
  }
};

export default rootReducer;
