import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/Buyer/Sidebar";
import { BsFillTagsFill } from "react-icons/bs";
import { CiMedal } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";

export default function BuyerDashboardPage() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="flex  gap-5">
        <Sidebar />

        <div>
          <>
            <section>
              <div className="shadow-s1 p-8 rounded-lg  ">
                <div className=" font-normal">
                  <div
                    className="text-center justify-between text-xs text-gray-700 uppercase w-full "
                    scope="col"
                  >
                    My Activity
                  </div>
                </div>
                <hr className="my-5" />

                <div className="grid grid-cols-3 gap-8 mt-8">
                  <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                    <BsFillTagsFill size={80} className="text-green" />
                    <div>
                      <div>25</div>
                      <div>Bid Placed</div>
                    </div>
                  </div>

                  <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                    <CiMedal size={80} className="text-green" />
                    <div>
                      <div>3</div>
                      <div>Items Won</div>
                    </div>
                  </div>

                  <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                    <IoIosHeartEmpty size={80} className="text-green" />
                    <div>
                      <div>10</div>
                      <div>Favorite Listings</div>
                    </div>
                  </div>

                  <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                    <FaTruck size={80} className="text-green" />
                    <div>
                      <div>2</div>
                      <div>Active Deliveries</div>
                    </div>
                  </div>

                  <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                    <MdOutlineHistory size={80} className="text-green" />
                    <div>
                      <div>15</div>
                      <div>Bidding Activity</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
}
