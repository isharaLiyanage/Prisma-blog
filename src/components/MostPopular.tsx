import React from "react";
import { WebUrl } from "./WebUrl";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(WebUrl + `/api/posts/populer`, {
    cache: "default",
  });
  if (!res.ok) {
    throw console.error("backend not working");
  }
  return res.json();
};
async function MostPopular() {
  const { post } = await getData();

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
      <div className=" my-3 relative">
        {" "}
        <button className="bg-orange-500 px-2 rounded-md ">category</button>
      </div>
      {post &&
        post.map((post: any) => (
          <div className="" key={post.id}>
            <Link href={`/${post.id}`}>
              <h5
                className=" font-bold"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></h5>
              <p>{setDate(post.crateAt)}</p>
            </Link>
          </div>
        ))}
      <p></p>
    </div>
  );
}

export default MostPopular;
