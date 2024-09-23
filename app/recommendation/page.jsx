"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TrackRecommendCard from "@components/TrackRecommendCard/TrackRecommendCard";
import GenreCard from "@components/GenreCard";
import "./recommendation.css";

const Page = () => {
  const { data: session } = useSession();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(null);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/genres");
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((selected) => selected !== genre)
      );
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleIsClicked = (genre) => {
    return !selectedGenres.includes(genre);
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/tracks/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seedGenres: selectedGenres.slice(0, 4),
          }),
        }
      );

      const data = await response.json();
      if (!data.error) {
        setRecommendedTracks(data);
        fetchUserPlaylists();
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const fetchUserPlaylists = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/v1/users/${session?.user.id}/playlists`
    );
    const data = await res.json();
    if (data.error) {
      console.log("Error Fetching Playlist.");
    } else {
      setUserPlaylists(data);
    }
  };

  const handleOptionClick = (track) => {
    if (isOptionOpen === track.id) {
      setIsOptionOpen(null);
    } else {
      setIsOptionOpen(track.id);
    }
  };

  const openUserPlaylists = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  const handlePlaylist = async ({ id, trackId }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/users/${session.user.id}/playlists/${id}/tracks/add_track`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trackId: trackId,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Added to Playlist");
        setIsOptionOpen(false);
        showNotification();
      }
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };

  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div id="recommendation-main">
      <div className="recommendation-header">
        <h1>
          Discover the{" "}
          <span className="bg-gradient-to-r from-white to to-blue-500 bg-clip-text text-transparent">
            Finest Music Tracks
          </span>{" "}
          Across All Genres
        </h1>
        <h2>
          Explore the most popular genres and find your next favorite song!
        </h2>
      </div>

      <div className="genre-container bg-zinc-900 py-12 px-8 rounded-lg snap-mandatory snap-y">
        {genres.length > 0 &&
          genres.map((genre, index) => (
            <GenreCard
              key={index}
              genreName={genre}
              isClicked={handleIsClicked(genre)}
              handleIsClicked={() => handleGenreClick(genre)}
            />
          ))}
      </div>

      <button className="submit" onClick={fetchRecommendations}>
        Submit
      </button>

      <div className="recommendation-result-container">
        <h2>Suggested Tracks</h2>
        <div className="suggested-tracks-container py-10 bg-zinc-950 rounded-lg snap-mandatory snap-y">
          {recommendedTracks.length > 0 &&
            recommendedTracks.map((track, index) => (
              <div key={index} className="snap-center">
                <TrackRecommendCard key={index} track={track} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
