"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";

import { Placeholder } from "@public";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import Loading from "@app/loading";
import { formatText } from "@app/search/page";

export const formatNumber = (number) => {
  return number !== undefined && number !== null
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
};

const Artist = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [artist, setArtist] = useState({});
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/artists/${params.id}`
        );
        const data = await response.json();

        if (params.id) setArtist(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchArtistAlbums = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/artists/${params.id}/albums`
        );
        const data = await response.json();

        if (params.id) setArtistAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchArtistTopTracks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/artists/${params.id}/top-tracks`
        );
        const data = await response.json();

        if (params.id) setArtistTopTracks(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRelatedArtists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/artists/${params.id}/related-artists`
        );
        const data = await response.json();

        if (params.id) setRelatedArtists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtist();
    fetchArtistAlbums();
    fetchArtistTopTracks();
    fetchRelatedArtists();
  }, [params.id]);

  const handleAlbumClick = (id) => {
    router.push(`/album/${id}`);
  };

  const handleArtistClick = (id) => {
    router.push(`/artist/${id}`);
  };

  if (!artist.name)
    return (
      <div className="w-screen min-h-screen">
        <Loading />
      </div>
    );

  return (
    <section className="w-full min-h-screen flex flex-col -translate-y-7">
      <div className="max flex px-24 py-11 gap-20 bg-green-500/10 shadow-[0_100px_100px] shadow-green-500/10">
        <div className="flex justify-center items-center">
          <Image
            src={artist.images ? artist.images : Placeholder}
            width={250}
            height={250}
            alt="artist image"
            className="object-contain rounded-full"
          />
        </div>

        <div className="w-full flex flex-col justify-end">
          <div className="max-w-[800px] flex justify-between items-center">
            <h1 className="text-5xl lg:text-7xl font-satoshi font-semibold tracking-wide text-left ">
              {artist.name}
            </h1>
            <a
              href={artist.spotif_link}
              target="_blank"
              className="spotify_link"
            >
              <FaSpotify />
              Open on Spotify
            </a>
          </div>

          <div className="flex flex-col">
            <div>
              {artist.genres &&
                artist.genres.map((genre, index) => (
                  <span key={index} className="text-xl font-light">
                    {index === artist.genres.length - 1
                      ? genre.slice(0, 1).toUpperCase() + genre.slice(1)
                      : `${genre.slice(0, 1).toUpperCase() + genre.slice(1)}, `}
                  </span>
                ))}
            </div>

            <p className="font-extralight">
              {formatNumber(artist.followers)} followers
            </p>
          </div>
        </div>
      </div>

      <div className="px-24 mt-9 flex flex-col gap-11">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold">Top Tracks</h1>
        </div>

        <div>
          {artistTopTracks.length > 0 &&
            artistTopTracks.map((track, index) => (
              <div key={index}>
                <TrackComponent track={track} i={index + 1} />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-14 px-24 w-auto">
        <div className="pr-40 flex justify-between items-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Artist Albums</h1>
          <a href={artist.spotif_link} target="_blank" className="spotify_link">
            <FaSpotify /> More on Spotify
          </a>
        </div>

        <div className="relative mt-9 flex flex-wrap gap-6">
          {artistAlbums.length > 0 &&
            artistAlbums.map((album, index) => (
              <div
                key={index}
                onClick={() => handleAlbumClick(album.id)}
                className="px-3 py-3 flex flex-col justify-between hover:bg-green-500/10 cursor-pointer rounded-md transition-colors"
              >
                <div className="flex justify-left items-center">
                  <Image
                    src={album.images ? album.images : Placeholder}
                    width={150}
                    height={150}
                    alt="album image"
                    className="rounded-lg object-contain"
                  />
                </div>

                <div className="mt-1 w-full">
                  <h2>{formatText({ text: album.name, len: 15 })}</h2>
                  <p className="text-sm font-extralight">
                    {album.release_date
                      ? new Date(album.release_date).getFullYear()
                      : ""}
                    &bull;
                    <span>{album.type === "album" ? "Album" : "Single"}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="px-24 mt-9 flex flex-col gap-11">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold">
            Related Artists
          </h1>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-6">
          {relatedArtists.length > 0 &&
            relatedArtists.map((artist, index) => (
              <div
                key={index}
                onClick={() => handleArtistClick(artist.id)}
                className="px-3 py-3 flex flex-col justify-between hover:bg-green-500/10 cursor-pointer rounded-md transition-colors"
              >
                <div className="flex justify-left items-center">
                  <Image
                    src={artist.images ? artist.images : Placeholder}
                    width={150}
                    height={150}
                    alt="artist images"
                    className="rounded-full object-contain"
                  />
                </div>

                <div>
                  <h1>{artist.name}</h1>
                  <p>Artist</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Artist;
