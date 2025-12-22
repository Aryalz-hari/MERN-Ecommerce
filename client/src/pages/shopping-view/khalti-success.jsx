import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyKhaltiPayment } from "../../store/shop/order-slice";

const KhaltiSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, success, error } = useSelector((state) => state.shopOrder);

  const pidx = searchParams.get("pidx");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  useEffect(() => {
    if (!pidx || !orderId) return;

    dispatch(verifyKhaltiPayment({ pidx, orderId }))
      .unwrap()
      .then(() => {
        sessionStorage.removeItem("currentOrderId");

        navigate("/shop/payment-success", {
          state: { fromPaymentGate: true },
        });
      });
  }, [dispatch, pidx, orderId, navigate]);

  return (
    <div>
      <h2>Verifying Khalti Payment...</h2>
      {loading && <p>Please wait...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default KhaltiSuccess;
