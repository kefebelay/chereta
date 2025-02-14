import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productData, formData, deliveryFee, user } = location.state || {};

  useEffect(() => {
    if (!productData || !formData || !user) {
      toast.error("Missing necessary information for checkout.");
      navigate(-1);
    } else {
      handleChapaPayment();
    }
  }, [productData, formData, user, navigate]);

  const handleChapaPayment = async () => {
    if (window.ChapaCheckout) {
      try {
        const chapa = new window.ChapaCheckout({
          publicKey: "CHAPUBK_TEST-BO2Rrunmr4QcRhmBE4J1anm92UPczOKQ",
          amount: (
            Number(productData.winning_bid_amount) + Number(deliveryFee)
          ).toString(),
          currency: "ETB",
          email: user.email,
          first_name: formData.full_name.split(" ")[0],
          last_name: formData.full_name.split(" ")[1] || "",
          phone_number: formData.phone,
          tx_ref: `chewatatest-${Date.now()}`,
          callbackUrl: "https://localhost:5173/orderlist",
          returnUrl: "http://localhost:5173/my-bids",
          customizations: {
            buttonText: "Pay Now",
            styles: `
              .chapa-pay-button { 
                display: block;
                width: 100%;
                padding: 15px;
                font-size: 18px;
                border: none;
                cursor: pointer;
                background-color: #096bf4;
                color: #FFFFFF;
                border-radius: 5px;
                transition: background-color 0.3s ease;
              }
              .chapa-pay-button:hover {
                background-color: #0052cc;
              }
            `,
          },
        });

        chapa.initialize("chapa-inline-form");
      } catch (error) {
        console.error("Error initializing Chapa payment:", error);
        toast.error(
          "Payment service is not available. Please try again later."
        );
      }
    } else {
      console.error("ChapaCheckout is not defined");
      toast.error("Payment service is not available. Please try again later.");
    }
  };

  const totalAmount =
    Number(productData?.winning_bid_amount || 0) + Number(deliveryFee || 0);
  const vat = totalAmount * 0.15;
  const grandTotal = totalAmount + vat;

  return (
    <div className="min-h-screen  p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-lg w-full rounded-lg shadow-text2 shadow-sm p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/chereta_logo.svg"
              className="bg-transparent h-12 w-12"
              alt="Chereta Logo"
            />
          </div>
          <h2 className="text-xl font-bold bg-transparent mb-3">Checkout</h2>
          <p className="text-text2 bg-transparent">
            Please review your order details before proceeding to payment.
          </p>
        </div>

        {/* Order Summary */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold bg-transparent">
            Order Summary
          </h3>
          <div className="text-gray-700 bg-transparent">
            <p className="bg-transparent">
              {productData?.title}{" "}
              <span className="float-right bg-transparent">
                {productData?.winning_bid_amount} ETB
              </span>
            </p>
            <p className="bg-transparent">
              Delivery Fee{" "}
              <span className="float-right bg-transparent">
                {deliveryFee} ETB
              </span>
            </p>
            <p className="bg-transparent">
              VAT (15%){" "}
              <span className="float-right bg-transparent">
                {vat.toFixed(2)} ETB
              </span>
            </p>
            <p className="font-bold mt-2 bg-transparent">
              Total{" "}
              <span className="float-right bg-transparent">
                {grandTotal.toFixed(2)} ETB
              </span>
            </p>
          </div>
        </div>

        {/* Chapa Payment Integration */}
        <div id="chapa-inline-form" className="mt-5"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
