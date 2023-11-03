import Article from "@/components/Article/Article";
import Comment from "@/components/Article/Comment";
import Session from "@/components/Article/Session";
import Categories from "@/components/Categories";
import MostPopular from "@/components/MostPopular";
import RecentPost from "@/components/RecentPost";
import { error } from "console";

const getData = async (slug: any) => {
  const res = await fetch(process.env.webUrl + `/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw error("backend not working");
  }
  return res.json();
};
async function page({ params }: any) {
  const { post } = await getData(params.slug);

  return (
    <div className=" my-2">
      {post && <Article posts={post} suppressHydrationWarning />}
      <div className="flex flex-wrap">
        <div className="w-full md:w-9/12">
          <Session postId={post.slug} />
          <div className="my-4">
            <b>Recent Posts</b>
          </div>
          <RecentPost page={1} />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col w-11/12 md:w-3/12">
          <div className="">
            <div className="my-4">
              <b>Most Popular</b>
            </div>

            <MostPopular />
            <MostPopular />
            <MostPopular />
          </div>
          <div className="">
            <div className="my-4">
              <b>Categories</b>
            </div>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
