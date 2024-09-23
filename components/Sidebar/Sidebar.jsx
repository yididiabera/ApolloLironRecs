"use client";
import { useRouter } from "next/navigation";
import { IoMdSearch, IoMdMusicalNote } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import "./Sidebar.css";
import { BillboardIcon, DonateIcon } from "../../public/index.js";

const Sidebar = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search");
  };

  const handleMusic = () => {
    router.push("/music");
  };

  const handlePlaylist = () => {
    router.push("/playlist");
  };

  const handleBillboard = () => {
    router.push("/billboard");
  };

  const handleDonate = () => {
    router.push("/donate");
  };

  return (
    <div className="sidebar-main">
      <div className="sidebar-container">
        <div className="sidebar-icon">
          <button className="sidebar-button" onClick={handleSearch}>
            <IoMdSearch className="sidebar-button-icon" />
          </button>

          <button className="sidebar-button" onClick={handleMusic}>
            <IoMdMusicalNote className="sidebar-button-icon" />
          </button>

          <button className="sidebar-button" onClick={handlePlaylist}>
            <BiSolidPlaylist className="sidebar-button-icon" />
          </button>

          <button className="sidebar-button" onClick={handleBillboard}>
            <img
              src={BillboardIcon}
              alt="Billboard"
              className="sidebar-button-icon"
            />
          </button>

          <button className="sidebar-button" onClick={handleDonate}>
            <img
              src={DonateIcon}
              alt="Donate"
              className="sidebar-button-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
