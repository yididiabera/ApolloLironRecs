"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { ApolloLironRecsLogo} from "@public";

import "./login.css";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  const postLogin = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/v1/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.message);
    }
  };

  if (session?.user) router.push("/");

  return (
    <div className="login-main">
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="relative z-50 w-full h-full flex-col">
        <div className="w-full px-20 py-12">
          <Link href="/" className="logo-header">
            <Image
              src={ApolloLironRecsLogo}
              alt="ApolloLironRecs-Logo"
              width={100}
              height={100}
              className="logo object-contain"
            />

            <h2 className="text-2xl lg:text-3xl">
              ApolloLiron<span className="highlight">Recs</span>
            </h2>
          </Link>
        </div>

        <div className="w-full h-[500px] flex justify-center items-center px-40">
          <div className="login-wrapper">
            <h2 className="login-header">Login</h2>

            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="button-connect"
                >
                  <FontAwesomeIcon
                    icon={provider.name === "Google" ? faGoogle : faGithub}
                    className="icon"
                  />
                  Connect with {provider.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
