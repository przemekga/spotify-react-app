export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
  }
}

export const setUserData = (userData) => {
  return {
    type: 'SET_USER_DATA',
    userData
  }
}

export const stopPlayback = () => {
  return {
    type: 'STOP_PLAYBACK'
  }
}

export const startPlayback = () => {
  return {
    type: 'START_PLAYBACK'
  }
}

export const songHasChanged = () => {
  return {
    type: 'SONG_HAS_CHANGED'
  }
}
