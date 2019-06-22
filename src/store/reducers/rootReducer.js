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
  userData: {}
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.userData
      }
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
