import React from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/Buyer/Sidebar";
import { TiEyeOutline } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Favorites() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="flex  gap-5">
        <Sidebar />
        <div>
          <section className="shadow-s1 p-8 rounded-lg">
            <div className="text-center  text-xs text-gray-700 uppercase w-full ">
              Favorites
            </div>
            <hr className="my-5 " />
            <br />
            <div className="relative overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-5">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Listing ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price (BIRR)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">Auction Item 01</td>
                    <td className="px-6 py-4">Fav_LsI125pT</td>
                    <td className="px-6 py-4">850</td>
                    <td className="px-6 py-4">
                      <img
                        className="w-10 h-10"
                        src="https://example.com/image1.png"
                        alt="Listing Image"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500 me-2"></div>
                        Available
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center flex items-center gap-3 mt-1">
                      <NavLink
                        to="/view-listing"
                        className="font-medium text-blue-500"
                      >
                        <TiEyeOutline size={25} />
                      </NavLink>
                      <button className="font-medium text-red-500">
                        <MdOutlineDeleteOutline size={25} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
