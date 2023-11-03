"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function Page() {
  const { data, status } = useSession();
  const route = useRouter();

  if (status == "loading") {
    return <div className=" m-auto">Loading...</div>;
  }
  if (status == "authenticated") {
    route.push("/");
  }
  return (
    <div className=" min-h-[400px]">
      <div className="flex cursor-pointer w-10/12 md:w-6/12 py-11 bg-lime-950 justify-center m-auto">
        <div className="">
          <div className=" my-1 px-5 py-2 bg-slate-300">
            <p onClick={() => signIn("google")}>Sign in with Google</p>
          </div>
          <div className=" my-1 px-5 py-2  bg-violet-400">
            <a href="">Sign in with Github</a>
          </div>
          <div className=" my-1 px-5 py-2  bg-neutral-400">
            <a href="">Sign in with Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
