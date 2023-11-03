import Image from "next/image";
import React from "react";
import img from "../../../public/girl.jpg";
import Comment from "./Comment";
type Post = {
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

function Article({ posts }: any) {
  return (
    <div>
      <article>
        <div className=" flex   md:flex-row flex-col-reverse  justify-between">
          <div className=" my-auto md:w-6/12">
            <div
              className=" text-xl font-bold"
              dangerouslySetInnerHTML={{ __html: posts.title }}
            ></div>
            <div className="flex flex-wrap self-center justify-round w-8/12">
              <div className="relative p-1 mr-2 w-9 h-9 rounded-full">
                <Image
                  src={posts.user.image}
                  fill
                  style={{ borderRadius: "50%" }}
                  objectFit="cover"
                  alt="d"
                />
              </div>
              <div className="">
                <div>{posts.user.name}</div>
                <div>{posts.crateAt.substring(0, 10)}</div>
              </div>
            </div>
          </div>

          <div className=" md:w-6/12 min-h-[300px] relative">
            <Image src={img} fill objectFit="cover" alt="d" />
          </div>
        </div>
        <div
          className=" p-2"
          dangerouslySetInnerHTML={{ __html: posts.desc }}
        ></div>
      </article>
    </div>
  );
}

export default Article;
