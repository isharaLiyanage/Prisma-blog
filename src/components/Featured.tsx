import Image from "next/image";
import travel from "../../public/travel.png";
function Featured() {
  return (
    <div className=" my-2">
      <div className="flex flex-col md:flex-row justify-between w-full md:w-8/12 m-auto">
        <div className="relative min-h-[200px] w-full md:w-5/12 ">
          <Image alt="" src={travel} fill objectFit="cover" />
        </div>
        <div className=" md:w-6/12">
          <h1 className=" text-xl">
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          </h1>
          <p className=" text-gray-600 dark:text-gray-200">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            debitis dolor, soluta dolores, officiis natus autem assumenda ipsa
            neque qui ea atque voluptas tenetur commodi.
          </p>
          <button className=" bg-slate-500 rounded-md px-1">Read more</button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
