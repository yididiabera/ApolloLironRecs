import React from "react";
import Image from "next/image";
import { Loader } from "@public";

export default function Loading() {
  return (
    <section className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
      <div className="w-52 h-52">
        <Image src={Loader} width={100} height={100} alt="Loading..." />
      </div>
    </section>
  );
}
