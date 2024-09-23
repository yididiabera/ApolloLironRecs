import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { formatText } from "@app/search/page";
import { FaSpotify } from "react-icons/fa";

import "./TrackRecommendCard.css";

export const calculateDuration = (number) => {
  const d_s = number / 1000;
  const min = Math.floor(d_s / 60);
  const sec = Math.floor(d_s % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
};

const TrackRecommendCard = ({ track }) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const { data: session } = useSession();
  const openUserPlaylists = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  return (
    <div className="relative w-[500px] px-5 py-4 bg-zinc-900 rounded-md flex gap-8">
      <div className="flex justify-center items-center">
        <Image
          src={track.album.images}
          width={150}
          height={150}
          alt="track image"
          priority={true}
          className="rounded-md object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap">
          <a href={`/track/${track.id}`} className="track_name">
            {formatText({ text: track.name, len: 12 })}
          </a>
        </div>

        <div className="flex flex-col">
          <div>
            {track.artists.map((artist, index) => (
              <a
                key={index}
                href={`/artist/${artist.id}`}
                className="artist_name"
              >
                {formatText({ text: artist.name, len: 8 })}
                {index !== track.artists.length - 1 && ",\u00A0"}
              </a>
            ))}
          </div>
          <p className="text-sm font-extralight">
            {calculateDuration(track.duration)}
          </p>
          <a href={`album/${track.album.id}`} className="album_name">
            {formatText({ text: track.album.name })}
          </a>
        </div>

        <div className="w-full flex justify-start items-center gap-4">
          <a
            href={track.spotify_link}
            target="_blank"
            className="spotify_link px-3"
          >
            <FaSpotify />
            Listen on Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackRecommendCard;
