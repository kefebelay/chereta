import { Link, redirect } from "react-router-dom";

export default function HeroSection() {
  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  }
  return (
    <div className="md:flex md:flex-row-reverse md:ml-28 sm:mb-20 md:mb-20 md:pt-7 ">
      <div className="md:w-5/6 ml-14 flex justify-center ">
        <img
          src="/assets/img/hero-section-img.svg"
          alt="Online Bidding vector image"
          className="heroImage pl-6 mt-10 ml-9 size-1/3 md:size-auto md:ml-0 lg:p-4"
        />
      </div>
      <div className=" md:mt-10 md:mb-20 w-fit">
        <h1 className=" lg:text-5xl md:text-4xl text-2xl md:p-4 font-extrabold text-center">
          Ethiopias Thriving Online{" "}
          <span className="text-primary m-3 bg-transparent">Marketplace </span>{" "}
          for Everything Bid High, Win Big
        </h1>
        <p className="p-3 text-center text-text2">
          Welcome to Chereta, Discover a world of possibilities. Buy and sell
          anything from electronics to antiques, from clothing to artwork.
        </p>
        <div className="mt-6 mx-11 md:mx-0 md:flex md:gap-4 justify-center flex flex-col">
          <Link
            to={"/#About"}
            onClick={handleClick}
            className="btn bg-secondary shadow-lg  md:w-full mb-4 md:mb-auto text-center"
          >
            <h1 className="bg-transparent font-bold md:text-xl ">
              {" "}
              How does it work?{" "}
            </h1>
          </Link>
          <Link
            to={"/signup"}
            className="btn bg-primary shadow-lg md:w-full md:mr-20 text-white text-center"
          >
            <h1 className="bg-transparent font-bold md:text-xl ">
              Get Started
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
