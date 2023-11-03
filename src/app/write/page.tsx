"use client";
import { WebUrl } from "@/components/WebUrl";
import Category from "@/components/write/Category";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useEffect, useState } from "react";

import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const Page = () => {
  const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
  });

  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [Cdata, setCdata] = useState<any>(null);
  const { data, status } = useSession();
  const route = useRouter();
  if (status == "unauthenticated") {
    route.push("/");
  }
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectImage = event.target.files?.[0] || null;
    setImage(selectImage);
  };

  const makeSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(WebUrl + "/api/categories");
      if (!res.ok) {
        throw new Error("backend not working");
      }
      const data = await res.json();
      setCdata(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image || "");
    data.append("upload_preset", "upload");
    const uploadRes = await fetch(
      "https://api.cloudinary.com/v1_1/de0uvxaje/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const url = await uploadRes.json();

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        slug: makeSlug(title || ""),
        desc: desc,
        img: url.url,
        catSlug: category,

        title,
      }),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="bubble"
          onChange={setTitle}
          placeholder="Add Title here..."
        />
        <input
          type="file"
          onChange={handleImage}
          accept="image/*"
          name="image"
          id=""
        />
        <div className=" w-full md:w-8/12  h-60 relative ">
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              objectFit="cover"
              alt={title || ""}
              fill
            />
          )}
        </div>
        <div className=" w-20 h-20 relative">
          <select
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
            id=""
          >
            {Cdata?.categories?.map((item: any) => (
              <option key={item.slug} value={item.slug}>
                {" "}
                {item.slug}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <ReactQuill placeholder="Add Article..." onChange={setDesc} />
        </div>{" "}
        <button className=" bg-blue-700 mx-3 my-1" type="submit">
          {" "}
          POST{" "}
        </button>
      </form>
    </div>
  );
};

export default Page;
