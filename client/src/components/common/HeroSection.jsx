import { Link } from "react-router-dom";

export default function HeroSection() {
  function handleClick() {
    const aboutSection = document.getElementById("HowItWorks");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "HowItWorks" not found');
    }
  }
  return (
    <div className="md:flex md:flex-row-reverse md:ml-28 sm:mb-20 md:mb-20 md:pt-7 ">
      <div className="container md:grid place-items-center hidden mr-3">
        <img
          src="/assets/img/hero-section-img.svg"
          alt="Online Bidding vector image"
          className="heroImage size-auto md:ml-0 lg:p-4"
        />
      </div>
      <div className=" md:mt-10 md:mb-20 w-fit mt-36">
        <h1 className=" lg:text-5xl md:text-4xl text-2xl md:p-4 font-extrabold text-center m-2">
          Welcome to{" "}
          <span className="text-primary bg-transparent">Chereta</span>.
          Ethiopias Thriving Online{" "}
          <span className="text-primary m-2 bg-transparent">Marketplace</span>,
          Bid High. Win Big
        </h1>
        <p className="p-3 text-center text-text2 text-sm md:text-lg">
          Discover a world of possibilities. Buy and sell anything from
          electronics to antiques, from clothing to artwork.
        </p>
        <div className="mt-6 mx-11 md:mx-0 md:flex md:gap-4 justify-center flex flex-col">
          <Link
            to={"/#HowItWorks"}
            onClick={handleClick}
            className="bg-transparent font-bold text-lg border-2 p-2 hover:bg-secondary hover:text-white rounded-lg
             border-secondary md:w-full mb-4 md:mb-auto text-center hover:drop-shadow-xl hover:shadow-primary box hover:-translate-y-0.5 transition-transform duration-200"
          >
            How does it work?{" "}
          </Link>
          <Link
            to={"/products"}
            className="btn bg-primary shadow-lg md:w-full md:mr-20 text-white text-center"
          >
            <h1 className="bg-transparent font-bold md:text-xl text-white">
              Get Started
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
