export default function Why_choose_us() {
  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold m-9 text-primary">
        Why Choose Us?
      </h1>
      <h2 className="text-center text-text2 text-lg">
        Chereta is an easy to use and navigate, simple to use and a very
        interactive and practical Online Bidding Website{" "}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="rounded-lg p-6">
          <h3 className="text-xl text-center pb-3 font-extrabold text-primary">
            Seamless User Experience
          </h3>
          <img
            src="/assets/img/why_choose_us_img.svg"
            alt="Seamless UI vector"
          />

          <p className="text-text2 text-center">
            At Chereta, we prioritize your convenience and ease of use. Our
            platform offers a user-friendly interface, ensuring that both buyers
            and sellers can navigate through auctions effortlessly. From placing
            bids to managing listings, our intuitive design and responsive
            features make every step of the process smooth and enjoyable
          </p>
        </div>

        <div className=" rounded-lg p-6">
          <h3 className="text-xl text-center pb-3 text-primary font-extrabold">
            Transparent and Fair Auctions
          </h3>
          <img
            src="/assets/img/why_choose_us_img.svg"
            alt="Fair Auction vector"
          />
          <p className="text-text2 text-center ">
            Transparency is at the heart of our auctions. We provide detailed
            information about each listing, including clear terms of sale and
            real-time bidding updates. Our commitment to fair play ensures that
            all participants have equal access to information and opportunities,
            fostering trust and integrity throughout the auction process.
          </p>
        </div>

        <div className=" rounded-lg p-6">
          <h3 className="text-xl text-center pb-3 text-primary font-extrabold">
            Global Reach with Local Expertise
          </h3>
          <img
            src="/assets/img/why_choose_us_img.svg"
            alt="Global reach vector"
          />
          <p className="text-text2 text-center ">
            Chereta combines the best of both worlds by offering a global
            platform with a deep understanding of local markets. While you can
            connect with bidders from around the world, we also tailor our
            services to meet the specific needs of Ethiopian users. This blend
            of international reach and local insight allows us to deliver a
            truly personalized and effective auction experience.
          </p>
        </div>
      </div>
    </div>
  );
}
