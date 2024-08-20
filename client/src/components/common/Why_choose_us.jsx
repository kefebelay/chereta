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
          <div className="flex justify-center m-3 rounded-full p-3">
            <img
              src="/assets/img/seamless_ui.jfif"
              alt="Seamless UI vector"
              className="rounded-full"
            />
          </div>
          <p className="text-text2 text-left">
            At Chereta, we prioritize your convenience and ease of use. Our
            platform offers a user-friendly interface, ensuring that both buyers
            and sellers can navigate through auctions effortlessly. From placing
            bids to managing listings, our intuitive design and responsive
            features make every step of the process smooth and enjoyable
          </p>
        </div>

        <div className=" rounded-lg p-6">
          <h3 className="text-xl text-center pb-3 text-primary font-extrabold">
            variety of products
          </h3>
          <div className="flex justify-center m-3 rounded-full border border-secondary p-3">
            <img
              src="/assets/img/variety_ui.png"
              alt="variety of products vector"
              className=""
            />
          </div>
          <p className="text-text2 text-left ">
            At Chereta, we offer a wide variety of products to choose from.
            Whether you arere looking for a new laptop, a rare vintage item, or
            a unique art piece, we have it all. Our platform is designed to
            showcase a diverse range of products, ensuring that buyers can find
            exactly what they are looking for.
          </p>
        </div>

        <div className=" rounded-lg p-6">
          <h3 className="text-xl text-center pb-3 text-primary font-extrabold">
            Global Reach with Local Expertise
          </h3>
          <div className="flex justify-center m-3 rounded-full">
            {" "}
            <img
              src="/assets/img/global.png"
              alt="Global reach vector"
              className="rounded-full size-3/4"
            />
          </div>
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
