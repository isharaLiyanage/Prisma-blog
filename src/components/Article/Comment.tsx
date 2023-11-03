"use client";
import Image from "next/image";
import React, { useState } from "react";
import img from "../../../public/girl.jpg";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { WebUrl } from "../WebUrl";

function Comment({ postId }: any) {
  const status = useSession();
  const fetcher = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw console.error("backend not working");
    }
    return data;
  };
  const { data, isLoading }: any = useSWR(
    WebUrl + `/api/comment/?postId=${postId}`,
    fetcher
  );

  const [comment, setComment] = useState<string>();

  const handleSubmit = async () => {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ desc: comment, postSlig: postId }),
    });
  };
  return (
    <div className=" w-11/12">
      <p className=" font-bold my-1">Comments</p>
      {status.status === "authenticated" ? (
        <div className=" flex">
          <input
            className=" w-full h-16 border border-slate-700"
            type="text"
            name="comment"
            id=""
            onChange={(e) => setComment(e.target.value)}
          />
          <div className=" flex self-center">
            <button
              onClick={handleSubmit}
              className=" px-2 py-1 ml-3 bg-slate-600"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        "Log in to write a comment"
      )}
      {isLoading
        ? "Loading"
        : data?.comment?.map((item: any) => (
            <div key={item.id} className=" my-3">
              <div className="flex flex-wrap self-center justify-round w-8/12">
                <div className="relative p-1 mr-2  w-10 h-10 rounded-full">
                  <Image
                    src={item.user.image}
                    fill
                    style={{ borderRadius: "50%" }}
                    objectFit="cover"
                    alt="d"
                  />
                </div>
                <div className="">
                  <p>{item.user.name}</p>
                  <p>{item.crateAt.substring(0, 10)}</p>
                </div>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
    </div>
  );
}

export default Comment;
