import React from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/Buyer/Sidebar";


export default function WinningBids() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="flex  gap-5">
        <Sidebar />

        <div>
          <>
            <section className="shadow-s1 p-8 rounded-lg">
              <div
                className="text-center justify-between text-xs text-gray-700 uppercase w-full "
                scope="col"
              >
                Winning Product Lists
              </div>
              <hr className="my-5" />
              <br />

              <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-5">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        LISTING ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Starting Bid Price(BIRR)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Won Bid Price(BIRR)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date Won
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delivery ETA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">Auction Title 01</td>
                      <td className="px-6 py-4">Bidding_HvO253gT</td>
                      <td className="px-6 py-4">500</td>
                      <td className="px-6 py-4">999</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-10 h-10"
                          src="https://example.com/image1.png"
                          alt="Jeseimage"
                        />
                      </td>
                      <td className="px-6 py-4">Awaiting Payment</td>
                      <td className="px-6 py-4">2024-11-01</td>
                      <td className="px-6 py-4">3-5 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
}
