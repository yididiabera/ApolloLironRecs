import Link from "next/link";

const Form = ({ type, playlist, setPlaylist, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full min-h-screen flex-start flex-col px-40">
      <h1 className="text-3xl sm:text-5xl font-semibold text-left">
        {type} Playlist
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">
            Playlist Name
          </span>

          <input
            type="text"
            value={playlist.name}
            onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })}
            placeholder="Enter PlaylistName..."
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="">Description</span>

          <textarea
            value={playlist.description}
            onChange={(e) =>
              setPlaylist({ ...playlist, description: e.target.value })
            }
            placeholder="Write description here..."
            required
            className="form_textarea"
          />
        </label>

        <div className="w-fyll flex justify-end items-center mx-3 mb-5 gap-5">
          <Link href="/" className="text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-green-700 rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
