"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import "./track.css";

const Track = ({ params }) => {
  const [track, setTrack] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const [moreTracks, setMoreTracks] = useState([]);
  const [suggestedTracks, setSuggestedTracks] = useState([]);

  useEffect(() => {
    const getTrack = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/tracks/${params.id}`
        );
        const data = await response.json();
        if (response.status === 200) {
          setTrack(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };
    getTrack();
  }, [params.id]);

  useEffect(() => {
    const getTrackLyrics = async () => {
      if (track) {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/v1/lyrics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              artistName: track.artists[0].name,
              songName: track.name,
            }),
          });
          const data = await response.json();
          if (response.status === 200) {
            setLyrics(data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching track lyrics:", error);
        }
      }
    };

    const getMoreTracks = async () => {
      // Fetch more tracks from the artist
      const artistID = track.artists[0].id;
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/artists/${artistID}/top-tracks`
        );
        const data = await response.json();
        if (response.status === 200) {
          setMoreTracks(data.slice(0, 5));
        } else {
          console.error(data.message);
        }
      } catch {
        console.log("Error fetching more tracks");
      }
    };

    const getSuggestedTracks = async () => {
      // Fetch suggested tracks
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/v1/tracks/recommendations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              seedArtists: track.artists.map((artist) => artist.id),
              seedTracks: [track.id],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestedTracks(data.slice(0, 5));
        } else {
          console.log(data.error);
        }
      } catch {
        console.log("Error fetching suggested tracks");
      }
    };

    if (track) {
      getTrackLyrics();
      getMoreTracks();
      getSuggestedTracks();
    }
  }, [track]);

  if (!track) {
    return <div>Loading track information...</div>;
  }

  return (
    <div className="track-main">
      <div className="track-head">
        <Image
          className="track-image"
          src={track.album.images}
          alt={track.name}
          height={200}
          width={200}
        />
        <div className="track-info">
          <div className="track-title">
            <h1>{track.name}</h1>
            <a
              className="spotify_link"
              href={track.spotify_link}
              target="_blank"
            >
              <FaSpotify /> Open in Spotify
            </a>
          </div>
          <div className="track-artist-names">
            {track.artists &&
              track.artists.length > 0 &&
              track.artists.map((artist, index) => (
                <span key={index}>
                  <a
                    href={`/artist/${artist.id}`}
                    className="track-artist-name"
                  >
                    {artist.name}
                  </a>
                  {index !== track.artists.length - 1 && ",\u00A0"}
                </span>
              ))}
          </div>
          <p className="track-album-name">Album: {track.album_name}</p>
        </div>
      </div>
      <div className="track-lyrics-more">
        <div className="lyrics-container">
          <h2>Lyrics</h2>

          {lyrics ? (
            <div className="track-lyrics">
              <p>{lyrics.lyrics}</p>
            </div>
          ) : (
            <p>Loading lyrics...</p>
          )}
        </div>
        <div className="track-more-artist">
          <h2>More Tracks</h2>
          <div className="more-track-container">
            {moreTracks.length > 0 ? (
              moreTracks.map((track, index) => (
                <TrackComponent key={index} track={track} i={index + 1} />
              ))
            ) : (
              <p>Loading more tracks...</p>
            )}
          </div>
        </div>
      </div>
      <div className="track-suggested">
        <h2>Suggested Tracks</h2>
        <div className="suggested-track-container">
          {suggestedTracks.length > 0 ? (
            suggestedTracks.map((track, index) => (
              <TrackComponent key={index} track={track} i={index + 1} />
            ))
          ) : (
            <p>Loading suggested tracks...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;