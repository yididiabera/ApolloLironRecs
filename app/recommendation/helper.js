import React from "react";

export const fetchUserPlaylists = async () => {
  const res = await fetch(
    `http://127.0.0.1:5000/api/v1/users/${session.user.id}/playlists`
  );
  const data = await res.json();
  console.log("Playlists: " + data);
  if (data.error) {
    console.log("Error Fetching Playlist.");
  } else {
    return data;
  }
};

const handlePlaylist = async ({ id }) => {
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/users/${session.user.id}/playlists/${id}/tracks/add_track`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trackId: track.id,
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
};

export const isOptionOpen = () => {};

const showNotification = () => {
  setNotificationVisible(true);
  setTimeout(() => {
    setNotificationVisible(false);
  }, 2000);
};
