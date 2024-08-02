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
        {/* Reason 1 */}
        <div className="bg-white rounded-lg p-6">
          <h3>Reason 1</h3>
          {/* Content */}
        </div>
        {/* Reason 2 */}
        <div className="bg-white rounded-lg p-6">
          <h3>Reason 2</h3>
          {/* Content */}
        </div>
        {/* Reason 3 */}
        <div className="bg-white rounded-lg p-6">
          <h3>Reason 3</h3>
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
