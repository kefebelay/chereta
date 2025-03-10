import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-auto text-primary p-8 pt-24 font-bold">
        About
      </h1>
      <div className="mx-10 bg-transparent">
        <p className=" text-text2">
          Welcome to{" "}
          <span className="text-primary bg-transparent">Chereta!!!</span>
          <br />
          <br />
          <span className="text-primary bg-transparent">Chereta</span> is an
          Ethiopian made online marketplace where buyers and sellers from all
          over the world can either bid on items or list items so that buyers
          can bid on it.
          <br /> Discover a new way to experience e-commerce with our online
          bidding platform, Find it, Bid it, Own it. Our website transforms the
          traditional shopping experience into an exciting auction-based
          marketplace. Whether you are a seller looking to list unique items or
          a buyer eager to place competitive bids, our platform offers a
          seamless and engaging experience for all. With a user-friendly
          interface and real-time bidding features, you can easily find and bid
          on a wide range of products. Our platform ensures transparency and
          fairness, allowing users to compete for items in an open and dynamic
          environment. Join us to explore a world where every item tells a
          story, and every bid brings you closer to owning something special.
        </p>
        <br />
        <span className="w-full m-3 bg-transparent text-accent">
          {" "}
          Key Features{" "}
        </span>
        <br />
        <ul className="bg-transparent list-disc ml-8">
          <li className="bg-transparent text-text2">
            Dynamic Auctions: Engage in live bidding wars and experience the
            thrill of auctions.
          </li>
          <li className="bg-transparent text-text2">
            Diverse Listings: Discover unique items across various categories.
          </li>
          <li className="bg-transparent text-text2">
            Secure Transactions: Enjoy a safe and secure shopping experience.
          </li>
          <li className="bg-transparent text-text2">
            {" "}
            User-Friendly Interface: Navigate easily through our platform and
            find the perfect items to bid on.
          </li>
        </ul>
        <br />{" "}
        <p className="bg-transparent text-text2">
          Want to partner with us? create your account{" "}
          <Link to="/seller/register" className="text-primary">
            here
          </Link>{" "}
          and start selling immediately
        </p>
        <p className="bg-transparent text-text2">
          Start your auction journey today and experience e-commerce like never
          before!
        </p>
        <br />
      </div>
    </div>
  );
}
