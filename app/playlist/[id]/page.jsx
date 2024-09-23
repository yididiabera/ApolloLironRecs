"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { PlaylistIcon } from "@public";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import TrackComponent from "@components/TrackComponent/TrackComponent";

import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const IndividualPlaylist = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);

  const fetchPlaylist = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}`
      );
      const data = await response.json();
      setPlaylist(data);
    } catch (error) {
      console.error(error);
    }
  }, [session?.user.id, params.id]);

  const fetchPlaylistTracks = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}/tracks`
      );
      const data = await response.json();

      if (data.length > 0) {
        const song = await Promise.all(
          data.map(async (track) => {
            const response = await fetch(
              `http://localhost:5000/api/v1/tracks/${track.id}`
            );
            const data = await response.json();
            return data;
          })
        );
        setSongs(song);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session?.user.id, params.id]);

  useEffect(() => {
    if (session?.user.id && params.id) {
      fetchPlaylist();
      fetchPlaylistTracks();
    }
  }, [fetchPlaylist, fetchPlaylistTracks, session?.user.id, params.id]);

  const handleSearchClick = () => {
    router.push(`/search/?user=${session?.user.id}`);
  };

  const handleDelete = async (id, user_id) => {
    try {
      const resposne = await fetch(
        `http://localhost:5000/api/v1/users/${user_id}/playlists/${id}`,
        {
          method: "DELETE",
        }
      );

      if (resposne.status === 200) {
        router.push(`/`);
      }
    } catch (error) {
      alert("Failed to delete playlist, please try again later.");
    }
  };

  const removeTrackFromPlaylist = async (playlist_id, user_id, track_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${user_id}/playlists/${playlist_id}/tracks/${track_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Filter the songs to remove.
        setSongs((prevSongs) =>
          prevSongs.filter((track) => track.id !== track_id)
        );
      }
    } catch (error) {
      console.error("Couldn't Delete Track.");
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col px-16 py-20">
      <div className="w-full flex items-end gap-10">
        <div className="w-full flex justify-center items-center">
          <Image
            src={PlaylistIcon}
            width={300}
            height={300}
            className="border border-gray-200 "
            alt="Playlist Icon"
          />
        </div>

        <div className="w-full flex flex-col gap-10">
          <h1 className="text-3xl sm:text-6xl font-semibold font-satoshi text-left">
            {playlist && playlist.name} Playlist{" "}
          </h1>
          <p className="text-lg sm:text-xl font-satoshi text-left">
            {playlist && playlist.description}
          </p>
        </div>

        {/* Delete Playlist and Edit Playlist */}
        {playlist.name != "Liked Songs" && (
          <div className="w-full px-14 flex items-center gap-7">
            <div
              onClick={() => router.push(`/playlist/${params.id}/edit`)}
              className="p-4 flex justify-center items-center rounded-md bg-blue-700 hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
            >
              <MdOutlineEdit size={25} />
            </div>

            <div
              onClick={() => handleDelete(params.id, session?.user.id)}
              className="p-4 flex justify-center items-center rounded-md bg-red-700 hover:bg-red-500 transition-colors duration-200 cursor-pointer"
            >
              <FaTrashAlt size={25} />
            </div>
          </div>
        )}
      </div>

      <div className="w-full mt-16">
        <h1 className="text-3xl sm:text-6xl font-semibold font-satoshi text-left mb-9">
          Songs
        </h1>
        <ul className="w-full">
          {songs.length > 0 ? (
            <div>
              {songs.map((track, index) => (
                <div className="flex items-center gap-9" key={index}>
                  <TrackComponent
                    key={index}
                    track={{ ...track, images: track.album.images }}
                    i={index + 1}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTrackFromPlaylist(
                        params.id,
                        session?.user.id,
                        track.id
                      );
                    }}
                  >
                    <MdDelete className="text-3xl hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col justify-center items-center gap-7">
              <h1 className="text-3xl py-1 sm:text-6xl font-semibold font-satoshi bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
                No Songs yet...
              </h1>
              <button
                onClick={handleSearchClick}
                className="my-4 py-1.5 px-5 bg-blue-500 rounded-full hover:bg-blue-300 hover:text-gray-100 transition-colors duration-200"
              >
                Search for Musics
              </button>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default IndividualPlaylist;
