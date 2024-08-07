import logo from "/loading_img.svg";
export default function Loading() {
  return (
    <div className="bg-transparent">
      <img
        src={logo}
        alt="Loading..."
        className=" animate-spin duration-300 h-14 color:text bg-transparent "
      ></img>
      <p className="mt-7 text-lgtext-text2">Please wait ...</p>
    </div>
  );
}
