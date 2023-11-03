import Categories from "@/components/Categories";
import MostPopular from "@/components/MostPopular";
import RecentPost from "@/components/RecentPost";

function page({ searchParams }: any) {
  const pageNumber = searchParams.page || 1;
  const { cat } = searchParams;

  return (
    <div className="flex flex-wrap">
      <div className="text-center">
        <h1>{cat} Blog</h1>
      </div>
      <div className="w-full md:w-9/12">
        <div className="my-4">
          <b>Recent Posts</b>
        </div>
        <RecentPost page={pageNumber} cat={cat} />
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
  );
}

export default page;
