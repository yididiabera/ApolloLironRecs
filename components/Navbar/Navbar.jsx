"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ApolloLironRecsLogo } from "@public/index.js";
import { CgDetailsMore } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  const toggleMoreOptions = () => setIsMoreOptionsOpen((prev) => !prev);

  return (
    <div className="navbar-main">
      <div className="navbar-wrapper flex justify-between items-center p-4 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg shadow-lg">
        <Link href="/" className="logo-header flex items-center">
          <Image
            src={ApolloLironRecsLogo}
            alt="ApolloLironRecs Logo"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <h2 className="ml-2 text-white text-2xl font-bold">
            ApolloLiron<span className="highlight">Recs</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex gap-8 items-center navbarlin">
          {session?.user && (
            <Link href={`/profile/${session.user.id}/playlists`} className="navbar_links text-white">
              My Playlists
            </Link>
          )}
          <Link href="/search" className="navbar_links text-white">
            Search
          </Link>
          <Link href="/new-release" className="navbar_links text-white">
            New Releases
          </Link>
          <Link href="/recommendation" className="navbar_links text-white">
            Recommendation
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMoreOptionsOpen && (
          <div className="drop_down absolute right-0 bg-white shadow-lg rounded-lg p-4 mt-2 z-10">
            {session?.user && (
              <Link
                href={`/profile/${session.user.id}/playlists`}
                className="navbar_links text-black"
                onClick={toggleMoreOptions}
              >
                My Playlists
              </Link>
            )}
            <Link href="/search" className="navbar_links text-black" onClick={toggleMoreOptions}>
              Search
            </Link>
            <Link href="/new-release" className="navbar_links text-black" onClick={toggleMoreOptions}>
              New Releases
            </Link>
            <Link href="/recommendation" className="navbar_links text-black" onClick={toggleMoreOptions}>
              Recommendation
            </Link>
          </div>
        )}

        {/* User Profile and Sign In/Out */}
        <div className="flex items-center">
          {session?.user ? (
            <>
              <button
                type="button"
                onClick={signOut}
                className="py-1.5 px-5 border border-white hover:border-red-600 hover:bg-red-500 transition duration-300 ease-in-out rounded-full text-white"
              >
                Sign Out
              </button>
              <Image
                src={session.user.image}
                alt="Profile Image"
                width={40}
                height={40}
                className="object-contain rounded-full select-none ml-3"
              />
              <div onClick={toggleMoreOptions} className="xl:hidden flex justify-end items-center cursor-pointer ml-3">
                <CgDetailsMore size={25} className="text-white" />
              </div>
            </>
          ) : (
            <>
              <button
                className="py-1.5 px-5 border border-white hover:border-green-600 hover:bg-green-500 transition duration-300 ease-in-out rounded-full text-white"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <div onClick={toggleMoreOptions} className="xl:hidden flex justify-end items-center cursor-pointer ml-3">
                <CgDetailsMore size={25} className="text-white" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
