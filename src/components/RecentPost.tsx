import Image from "next/image";
import girl from "../../public/travel.png";
import React, { useState } from "react";
import { error } from "console";
import { split } from "postcss/lib/list";
import PageBtn from "./PageBtn";
import Link from "next/link";
import RecentPostTag from "@/components/RecentPostTag";
import PostTag from "@/components/RecentPostTag";
type Posts = {
  id: string;
  crateAt: string;
  desc: string;
  cat: string;
  catSlug: string;
  slug: string;
  title: string;
  img: string;
  user: string;
};

const getData = async ({ page, cat }: any) => {
  const res = await fetch(
    process.env.webUrl + `/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw error("backend not working");
  }
  return res.json();
};
async function RecentPost({ page, cat }: any) {
  const { posts, count } = await getData({ page, cat });

  // Create page number
  const Post_per_page = 2;
  const Prev = Post_per_page * (page - 1) > 0;
  const Next = Post_per_page * (page - 1) + Post_per_page < count;

  // set Date
  const setDate = (data: any) => {
    const isoDateString = data;
    // Create a Date object from the input string
    const dateObj = new Date(isoDateString);

    // Extract the date components
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    // Create the date string in the desired format
    const formattedDate = `${month}.${day}.${year}`;

    return formattedDate;
  };

  return (
    <div>
      <div className=" my-2">
        {posts?.map((item: Posts) => (
          <div key={item.id} className="my-2 flex justify-between m-auto">
            <div className="relative w-5/12 ">
              <Link href={item.id}>
                <Image alt="" src={item.img} fill objectFit="cover" />
              </Link>
            </div>
            <div className=" w-6/12">
              <div className="flex">
                <p> {setDate(item.crateAt)}</p>
                <a href="#" className=" ml-2 text-red-300">
                  {item.catSlug}
                </a>
              </div>
              <Link href={item.id}>
                <PostTag
                  title={item.title}
                  desc={item.desc}
                  suppressHydrationWarning
                />
              </Link>
              <button className=" mt-2 bg-slate-500 rounded-md px-1">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      <PageBtn Prev={Prev} Next={Next} page={page} />
    </div>
  );
}

export default RecentPost;
