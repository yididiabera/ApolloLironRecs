"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import Loading from "@app/loading";
import { formatText } from "@app/search/page";
import { Placeholder } from "@public";

const NewReleases = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/albums/new-releases"
      );

      const data = await response.json();
      setAlbums(data);
    };

    fetchAlbums();
  }, []);

  if (albums.length === 0)
    return (
      <section className="w-screen min-h-screen">
        <Loading />
      </section>
    );
  return (
    <section className="w-full min-h-screen py-24 px-40 flex justify-center items-center">
      <div className="w-3/4 flex flex-col bg-zinc-900 gap-10 p-7 rounded-md">
        {albums &&
          albums.map((album, index) => (
            <div
              key={index}
              className="flex items-center gap-20 last:border-none  border-b pb-6"
            >
              <div className="flex items-center justify-center w-32 h-full">
                <p className="w-10 h-10 text-xl border-2 border-green-500 rounded-full flex justify-center items-center">
                  {index + 1}
                </p>
              </div>

              <div className="flex justify-center items-center">
                <Image
                  src={album.images ? album.images : Placeholder}
                  width={250}
                  height={250}
                  alt="Album image"
                  className="rounded-md object-contain"
                />
              </div>

              <div className="flex flex-col gap-6">
                <a
                  href={`/album/${album.id}`}
                  className="text-3xl lg:text-4xl font-satoshi font-semibold hover:underline hover:text-green-600 transition-all duration-150"
                >
                  {album.name}
                </a>
                <div>
                  {album.artists.map((artist, index) => (
                    <span
                      key={index}
                      className="text-xl lg:text-2xl hover:underline hover:text-green-600 transition-all duration-150"
                    >
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

                <div className="font-extralight select-none">
                  Total Tracks: {album.total_tracks}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default NewReleases;
