import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = (path) => {
    window.location.href = path;
  };
  const location = useLocation();

  // If the user typed the URL manually, location.state will be undefined
  if (!location.state?.fromPaymentGate) {
    return <Navigate to="/" replace />;
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <CheckCircle
                className="relative w-24 h-24 text-green-500 animate-bounce"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-black mb-3">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </p>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Package className="w-5 h-5" />
              <span className="font-medium">Order confirmed</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You'll receive an email confirmation shortly
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/shop/listing")}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/shop/account")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition-all duration-300 border border-gray-300"
            >
              View My Orders
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
