export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
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
