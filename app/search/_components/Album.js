import "./styles/album-search.css";
import { useRouter } from "next/navigation";
import { AlbumPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";
import { formatText } from "../page";
import Image from "next/image";

const Album = ({ album, i }) => {
  const router = useRouter();

  const handleAlbumClick = (id) => {
    router.push(`/album/${id}`);
  };

  return (
    <div className="search-album-container">
      <Image
        className="rounded-full object-contain border border-green-500"
        src={album.images ? album.images : AlbumPlaceholder}
        width={120}
        height={120}
        alt={`Album ${album.name}`}
      />
      <h3
        className="hover:text-green-500 hover:underline transition-colors cursor-pointer"
        onClick={() => handleAlbumClick(album.id)}
      >
        {formatText({ text: album.name })}
      </h3>
      <a href={album.spotify_link} target="_blank">
        Spotify &nbsp;
        <MdOpenInNew />
      </a>
    </div>
  );
};

export default Album;
