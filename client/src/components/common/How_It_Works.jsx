export default function How_It_Works() {
  return (
    <div className="bg-background2">
      <h1 className="text-center text-5xl font-extrabold m-9 pt-10 text-primary bg-transparent">
        How it works
      </h1>
      <h2 className="text-center text-text2 text-lg bg-transparent">
        Chereta is an easy to use and navigate, simple to use and a very
        interactive and practical Online Bidding Website{" "}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 bg-transparent p-3 pb-10">
        <div className="bg-transparent">
          <h3 className="text-lg text-center pb-3 font-extrabold text-primary bg-transparent">
            Step 1: Choose a Product Seamless User Experience
          </h3>
          <div className="rounded-lg p-3 bg-transparent flex justify-center mb-2">
            <img
              src="/assets/img/choose_item_vector.svg"
              alt="How to auction vector"
              className="bg-transparent"
            />
          </div>

          <p className="text-text2 text-center bg-transparent">
            Browse through our wide range of products, and select the one you
            want to bid on.
          </p>
        </div>

        <div className=" rounded-lg  bg-transparent">
          <h3 className="text-lg text-center pb-3 text-primary font-extrabold bg-transparent">
            Step 2: Select Amount and Bid Transparent and Fair Auctions
          </h3>

          <div className="flex justify-center m-3 rounded-full p-3 bg-transparent">
            <img
              src="/assets/img/bid.svg"
              alt="Select amount vector"
              className=" h-3/5 w-3/5 bg-transparent"
            />
          </div>
          <p className="text-text2 text-center bg-transparent">
            Set the amount you are willing to bid and we will help you to
            successfully bid on the product.
          </p>
        </div>
        <div className="bg-transparent">
          <h3 className="text-lg text-center pb-3 text-primary font-extrabold bg-transparent">
            Step 3: Get Notified When You Win Global Reach with Local Expertise
          </h3>
          <div className=" rounded-lg p-6 bg-transparent flex justify-center">
            <img
              src="/assets/img/notification_vector.svg"
              alt="Get notified vector"
              className="bg-transparent h-3/5 w-3/5"
            />
          </div>
          <p className="text-text2 text-center bg-transparent">
            Once you have won the auction, we will notify you by email and you
            can make the payment and get the product.
          </p>
        </div>
      </div>
    </div>
  );
}
