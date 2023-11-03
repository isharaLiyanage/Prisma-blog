"use client";

import { useRouter } from "next/navigation";

function PageBtn({ Prev, Next, page }: any) {
  const router = useRouter();

  const handlePrev = () => {
    if (Prev == true) {
      router.push(`/?page=${parseInt(page) - 1}`);
    }
  };
  const handleNext = () => {
    if (Next == true) {
      router.push(`/?page=${parseInt(page) + 1}`);
    }
  };

  return (
    <div className="flex w-full justify-around mt-3">
      <button
        onClick={handlePrev}
        className="disabled:bg-red-500 px-3 bg-red-800 rounded-md cursor-pointer"
      >
        Prev
        {Prev ? "" : ""}
      </button>
      <button
        onClick={handleNext}
        className=" px-3 bg-red-800 rounded-md cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default PageBtn;
