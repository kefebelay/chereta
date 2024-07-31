export default function PopularCategories() {
  return (
    <div className="bg-background2">
      <h1 className="text-center text-5xl font-extrabold m-9 bg-background2">
        Popular Categories
      </h1>
      <h2 className="text-center text-gray-600 text-lg bg-background2">
        Here are a list of most popular categories that our users usually Choose
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-8 bg-background2 p-20">
        <div className="bg-secondary flex flex-col items-center rounded-lg p-3 hover:-translate-y-1 shadow-md shadow-gray-700">
          <h3 className="p-3 w-full text-center">Category 1</h3>
          <div className=" h-72 w-80 bg-black rounded-xl m-2"></div>
          <button className="btn bg-primary w-full text-white">View</button>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-lg p-3 hover:-translate-y-1 shadow-md shadow-gray-700">
          <h3 className="p-3 w-full text-center">Category 2</h3>
          <div className=" h-72 w-80 bg-black rounded-xl m-3"></div>
          <button className="btn bg-primary w-full text-white">View</button>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-lg p-3 hover:-translate-y-1 shadow-md shadow-gray-700">
          <h3 className="p-3 w-full text-center">Category 3</h3>
          <div className=" h-72 w-80 bg-black rounded-xl m-3"></div>
          <button className="btn bg-primary w-full text-white">View</button>
        </div>
      </div>
    </div>
  );
}
