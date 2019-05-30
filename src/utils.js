import * as Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify();

const transformUnix = function(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export {spotifyApi, transformUnix}