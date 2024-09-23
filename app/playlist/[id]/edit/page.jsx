"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

const Edit = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [playlist, setPlaylist] = useState({ name: "", description: "" });

  let id;

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}`
        );

        const data = await response.json();
        if (params.id) setPlaylist(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist();
  }, [params.id]);

  const editPlayList = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}`,
        {
          method: "PATCH",
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
      type="Edit"
      playlist={playlist}
      setPlaylist={setPlaylist}
      submitting={submitting}
      handleSubmit={editPlayList}
    />
  );
};

export default Edit;
