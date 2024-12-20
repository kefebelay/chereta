import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/Buyer/Sidebar";

import { BsTruck } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineContactPhone } from "react-icons/md";

export default function DeliveryTracking() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="flex  gap-5">
        <Sidebar />
        <div>
          <section className="shadow-s1 p-8 rounded-lg">
            <div
              className="text-center justify-between text-xs text-gray-700 uppercase w-full "
              scope="col"
            >
              Delivery Tracking
            </div>
            <hr className="my-5" />
            <br />

            <div>
              <div className="grid grid-cols-3 gap-8">
                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                  <BsTruck size={80} className="text-green" />
                  <div>
                    <div className="text-lg font-bold">Order #12345</div>
                    <div>Order ID</div>
                  </div>
                </div>

                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                  <FiMapPin size={80} className="text-green" />
                  <div>
                    <div className="text-lg font-bold">In Transit</div>
                    <div>Current Status</div>
                  </div>
                </div>

                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                  <AiOutlineCalendar size={80} className="text-green" />
                  <div>
                    <div className="text-lg font-bold">March 25, 2024</div>
                    <div>Estimated Delivery</div>
                  </div>
                </div>

                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                  <MdOutlineContactPhone size={80} className="text-green" />
                  <div>
                    <div className="text-lg font-bold">John Doe</div>
                    <div>Delivery Personnel</div>
                  </div>
                </div>

                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-left justify-center gap-5 flex-col rounded-xl col-span-2">
                  <h2 className="text-lg font-bold">Tracking History</h2>
                  <div className="tracking-history text-sm">
                    <div className="mb-2">
                      <strong>March 23, 2024</strong> - Picked Up from Warehouse
                    </div>
                    <div className="mb-2">
                      <strong>March 24, 2024</strong> - In Transit (Location:
                      City A)
                    </div>
                    <div>
                      <strong>March 25, 2024</strong> - Out for Delivery
                    </div>
                  </div>
                </div>

                <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
                  <button className="bg-green text-white px-4 py-2 rounded-lg font-semibold">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
