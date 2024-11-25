export default function SellerProfile({ seller }) {
  return (
    <div className="flex gap-3 p-1 bg-transparent">
      <div className="h-14 w-14 rounded-full border-2 bg-transparent">
        <img
          className="rounded-full bg-transparent"
          src={seller.image || "assets/icons/profile.svg"}
          alt="Seller"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{seller.username}</h2>
        <p className="text-sm text-gray-600">{seller.email}</p>
      </div>
    </div>
  );
}
