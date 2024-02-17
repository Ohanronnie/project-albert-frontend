import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { axios } from "../utils/axios.js";
import Header from "../components/Header";
export default function Payment() {
  const [hasPaid, setHasPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/user")
      .then((response) => {
        const data = response.data;
        if (data.paymentRequired) {
          setHasPaid(false);
        } else if (!data.paymentRequired) {
          setHasPaid(true);
          navigate("/home");
        }
      })
      .catch((error) => {
        setHasPaid(false);
      })
      .finally((e) => setLoading(false));
  }, []);
  const generateLink = () => {
    axios.post("/payment/initialize").then((e) => {
      console.log(e.data);
      window.location.href = e.data.payment_url;
    });
  };
  const PaymentCard = () => {
    return (
      <>
        <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="border-[1px] p-2 rounded-md border-solid text-center bg-base-200">
            <p className="text-base font-semibold text-indigo-600">
              Confirm To Pay?
            </p>
            <h1 className="mt-4 px-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Confirm to pay
            </h1>
            <p className="mt-6 text-base leading-7">
              You're about to pay ₦3000
            </p>
            <div className="mt-10 w-full flex items-center justify-center gap-x-6">
              <button
                className="btn bg-base-100"
                onClick={() => generateLink()}
              >
                Pay
              </button>
              <button
                className="btn  bg-base-100"
                onClick={() => history.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </main>
      </>
    );
  };
  const PaymentDiv = () => (
    <>
      <nav>
        <Header />
      </nav>
      <section>
        <PaymentCard />
      </section>
    </>
  );
  return (
    <>
      {!loading ? (
        <>
          {/*hasPaid && <Navigate to="/home" replace/>*/}
          <PaymentDiv />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
