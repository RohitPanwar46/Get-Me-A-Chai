/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, intiate, fetchpayments, fetchTotalPayments } from "@/action/useractions";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: 0 });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const SearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
    document.title = `${username} - Get Me A Chai`;
  }, []);

  useEffect(() => {
    if (SearchParams.get("paymentdone") === "true") {
      toast("Payment done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setCurrentUser(u);

    let p = await fetchpayments(username);
    setPayments(p);

    let totalp = await fetchTotalPayments(username);
    setTotalPayments(totalp);
  };

  const pay = async () => {
    const amount = paymentform.amount;
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      let a = await intiate(amount * 100, username, paymentform);
      let orderId = a.id;

      var options = {
        key: currentUser.razorpayId,
        amount: amount * 100,
        currency: "INR",
        name: "Get Me A Chai",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: `http://localhost:3000/api/razorpay`,
        prefill: {
          name: paymentform.name || "Default Name",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="w-full">
        <div className="relative">
          <img className="bg-cover w-full h-48 md:h-64 object-cover" src={currentUser.cover} alt="" />
          <img
            className="absolute -bottom-14 rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto left-1/2 transform -translate-x-1/2"
            src={currentUser.profile}
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 my-20 text-center">
        <div className="username font-bold text-2xl">@{username}</div>
        <div className="tagline text-slate-400 text-sm md:text-base">Let&apos;s help {username} to get a chai</div>
        <div className="otherInfo text-slate-400 text-sm md:text-base">
          {totalPayments.length} payments • ₹{totalPayments.reduce((a, b) => a + b.amount / 100, 0)} raised
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 mx-auto w-[90%] mb-10 text-slate-200">
        {/* Supporters Section */}
        <div className="Supporters bg-slate-900 w-full md:w-1/2 rounded-lg min-h-96 overflow-y-hidden p-6">
          <h1 className="font-bold text-2xl">Top 10 Supporters</h1>
          {payments.length === 0 && (
            <div className="ml-3 py-3 font-semibold">No Payments Yet</div>
          )}
          {payments.map((payment, index) => (
            <ul key={index}>
              <div className="flex items-center gap-2">
                <img className="ml-3" width={26} height={26} src="/avatar.gif" alt="" />
                <li className="py-3">
                  {payment.name} donated <span className="font-bold">{payment.amount / 100}₹</span> with
                  message &quot;{payment.message}&quot;
                </li>
              </div>
            </ul>
          ))}
        </div>

        {/* Payment Form Section */}
        <div className="paymentPage flex flex-col gap-4 bg-slate-900 w-full md:w-1/2 rounded-lg p-6">
          <h1 className="font-bold text-2xl">Make a payment</h1>

          <div className="paymentForm flex flex-col gap-2">
            <input
              onChange={handleChange}
              value={paymentform.name}
              className="bg-slate-800 rounded-lg px-3 h-10"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
            />
            <input
              onChange={handleChange}
              value={paymentform.message}
              className="bg-slate-800 rounded-lg px-3 h-10"
              type="text"
              name="message"
              id="message"
              placeholder="Enter your message"
            />
            <input
              onChange={handleChange}
              value={paymentform.amount}
              className="bg-slate-800 rounded-lg px-3 h-10"
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
            />
            <button
              type="button"
              onClick={() => pay(paymentform.amount)}
              disabled={paymentform.name.length < 3 || paymentform.message.length < 5 || paymentform.amount < 1}
              className="disabled:from-slate-300 text-white bg-gradient-to-br from-purple-700 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Pay
            </button>
          </div>

          <div className="paymentoption flex flex-wrap gap-2">
            <button
              className="bg-slate-800 rounded-lg px-4 py-2 text-center"
              onClick={() => setPaymentform((prevState) => ({ ...prevState, amount: 10 }))}
            >
              Pay ₹10
            </button>
            <button
              className="bg-slate-800 rounded-lg px-4 py-2 text-center"
              onClick={() => setPaymentform((prevState) => ({ ...prevState, amount: 20 }))}
            >
              Pay ₹20
            </button>
            <button
              className="bg-slate-800 rounded-lg px-4 py-2 text-center"
              onClick={() => setPaymentform((prevState) => ({ ...prevState, amount: 30 }))}
            >
              Pay ₹30
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
