import React, { useEffect, useState } from "react";
import { Radar, ResponsiveLine } from "nivo";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { spotifyApi } from "../../utils";
import PresentationHeader from "../PresentationHeader/PresentationHeader";

const TrackAnalysis = ({ match }) => {
  const [trackData, setTrackData] = useState({});
  const [trackAnalysis, setTrackAnalysis] = useState({});
  const [trackFeatures, setTrackFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const songProperties = [
    {
      name: "acousticness",
      desc:
        "a confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
    },
    {
      name: "danceability",
      desc:
        "danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
    },
    {
      name: "energy",
      desc:
        "energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."
    },
    {
      name: "instrumentalness",
      desc:
        "predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0."
    },
    {
      name: "liveness",
      desc:
        "detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."
    },
    // "loudness",
    {
      name: "speechiness",
      desc:
        "speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."
    },
    {
      name: "valence",
      desc:
        "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
    }
  ];

  const pitches = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];
  const modes = ["Minor", "Major"];

  useEffect(() => {
    getArtistData(match.params.id).then(res => {
      const { summary, analysis, features } = res;
      setTrackData(summary);
      setTrackAnalysis(analysis);
      setTrackFeatures(features);
      setIsLoading(false);
      console.log(summary);
    });
  }, [match.params.id]);

  const trackFeaturesChartData = songProperties.map(songProperty => {
    return {
      "Song Property": songProperty.name,
      Value: trackFeatures[songProperty.name]
    };
  });

  async function getArtistData(id) {
    const summary = spotifyApi.getTrack(id);
    const analysis = spotifyApi.getAudioAnalysisForTrack(id);
    const features = spotifyApi.getAudioFeaturesForTrack(id);
    const finalResult = {
      summary: await summary,
      analysis: await analysis,
      features: await features
    };
    return finalResult;
  }

  const audioFeatureDescriptions = songProperties.map(property => (
    <p key={property.name}>
      <b style={{ textTransform: "capitalize" }}>{property.name}</b> -{" "}
      {property.desc}
    </p>
  ));

  return (
    <div className="row">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <PresentationHeader
            image={trackData.album.images[0].url}
            name={`${trackData.artists[0].name} - ${trackData.name}`}
            secondLine={false}
          />
          <div className="col-12">
            <iframe
              src={`https://open.spotify.com/embed?uri=${trackData.uri}`}
              frameBorder="0"
              allow="encrypted-media"
              allowtransparency="true"
              height="80px"
              width="100%"
            />
            <h5>Audio Features</h5>
          </div>
          <div className="col-12 col-md-4">
            <p>
              <strong>Key</strong>: {pitches[trackFeatures.key]}
            </p>
            <p>
              <strong>Mode</strong>: {modes[trackFeatures.mode]}
            </p>
            <p>
              <strong>Tempo</strong>: {Math.floor(trackAnalysis.track.tempo)} BPM
            </p>
            {trackFeaturesChartData.map(item => {
              return (
                <p>
                  <strong style={{textTransform: 'capitalize'}}>{item["Song Property"]}</strong>: {item["Value"]}
                </p>
              )
            })}
          </div>
          <div className="col-12 col-md-8">
            <div
              style={{
                height: "500px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Radar
                data={trackFeaturesChartData}
                indexBy="Song Property"
                keys={["Value"]}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                maxValue={1}
                width={700}
                height={500}
              />
            </div>
          </div>
          <div className="col-12">
            {audioFeatureDescriptions}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackAnalysis;
