// src/components/SellerProfile.jsx
import React from "react";

const SellerProfile = ({ seller }) => (
  <div className="flex gap-3 p-1">
    <div className="h-14 w-14 rounded-full border-2">
      <img className="rounded-full" src={seller.picture.medium} alt="Seller" />
    </div>
    <div>
      <h2 className="text-lg font-semibold">
        {seller.name.first} {seller.name.last}
      </h2>
      <p className="text-sm text-gray-600">{seller.email}</p>
    </div>
  </div>
);

export default SellerProfile;
