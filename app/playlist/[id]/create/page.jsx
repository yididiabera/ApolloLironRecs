"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePlaylist = ({ params }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });

  const createPlaylist = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let id;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${params.id}/playlists/create_playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlist),
        }
      );

      const data = await response.json();
      id = data.id;
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      router.push(`/playlist/${id}`);
    }
  };

  return (
    <Form
      type="Create"
      playlist={playlist}
      setPlaylist={setPlaylist}
      submitting={submitting}
      handleSubmit={createPlaylist}
    />
  );
};

export default CreatePlaylist;
