function PostTag({ title, desc }: any) {
  return (
    <div>
      <div
        className=" text-md font-bold mb-2"
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>
      <section
        className=" line-clamp-3 text-[12px] text-gray-600 dark:text-gray-200"
        dangerouslySetInnerHTML={{
          __html: desc.substring(0, 5000),
        }}
      ></section>
    </div>
  );
}

export default PostTag;
