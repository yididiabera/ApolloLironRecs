"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import Loading from "@app/loading";

import "./album.css";

const Album = ({ params }) => {
  const [album, setAlbum] = useState({});

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const responose = await fetch(
          "http://127.0.0.1:5000/api/v1/albums/" + params.id
        );
        if (responose.ok) {
          const data = await responose.json();
          console.log(data);
          setAlbum(data);
        } else {
          console.log("Error Fetching Album");
        }
      } catch (error) {
        console.log("Error Fetching Album: " + error);
      }
    };
    fetchAlbum();
  }, [params.id]);

  if (!album.name)
    return (
      <div className="w-screen min-h-screen">
        <Loading />;
      </div>
    );

  return (
    <div className="album-main">
      <div className="album-head">
        <Image
          src={album.images}
          alt="Album Image"
          width={300}
          height={300}
          className="album-image"
        />
        <div className="album-info">
          <div className="album-title">
            <h1>{album.name}</h1>
            <a
              className="spotify_link"
              href={album.spotify_link}
              target="_blank"
            >
              <FaSpotify /> Open in Spotify
            </a>
          </div>
          <div className="album-artist-names">
            {album.artists &&
              album.artists.length > 0 &&
              album.artists.map((artist, index) => (
                <span key={index}>
                  <a
                    href={`/artist/${artist.id}`}
                    className="album-artist-name"
                  >
                    {artist.name}
                  </a>
                  {index !== album.artists.length - 1 && ",\u00A0"}
                </span>
              ))}
          </div>
          <p className="album-release">Released Date: {album.release_date}</p>
        </div>
      </div>
      <h2>Tracks</h2>
      <div className="album-tracks">
        {album.tracks &&
          album.tracks.map((track, index) => (
            <TrackComponent key={index} track={track} i={index + 1} />
          ))}
      </div>
    </div>
  );
};

export default Album;
