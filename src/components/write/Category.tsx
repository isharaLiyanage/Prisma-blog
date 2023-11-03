const getData = async () => {
  const res = await fetch(process.env.webUrl + "/api/categories", {
    cache: "default",
  });
  if (!res.ok) {
    throw console.error("backend not working");
  }
  return res.json();
};
function Category() {
  const cat = async () => {
    return await getData();
  };

  return (
    <select name="category" id="">
      {cat?.categories?.map((item: any) => (
        <option key={item.slug} value={item.slug}>
          {" "}
          {item.slug}
        </option>
      ))}
    </select>
  );
}

export default Category;
