/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, updateprofile } from "@/action/useractions";
import { ToastContainer, Bounce, toast } from "react-toastify";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profile: "",
    cover: "",
    razorpayId: "",
    razorpaysecret: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    } else if (status === "unauthenticated") {
      console.error("User is not authenticated.");
    }
  }, [status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setForm(u);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let a = await updateprofile(form, session.user.name);
    toast("Profile updated!", {
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
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
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

      <div className="font-bold text-xl md:text-2xl lg:text-3xl text-center mt-4">
        Welcome to your Dashboard
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 mt-6"
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Username", name: "username", type: "text" },
          { label: "Profile Picture", name: "profile", type: "text" },
          { label: "Cover Picture", name: "cover", type: "text" },
          { label: "Razorpay Id", name: "razorpayId", type: "text" },
          { label: "Razorpay Secret", name: "razorpaysecret", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col gap-2 w-full">
            <label
              htmlFor={name}
              className="text-sm md:text-base text-slate-300 font-semibold"
            >
              {label}
            </label>
            <input
              value={form[name]}
              onChange={handleChange}
              className="h-[36px] bg-gray-700 text-white rounded-lg px-3 text-sm md:text-base"
              type={type}
              name={name}
              id={name}
            />
          </div>
        ))}

        <button
          className="w-full bg-sky-800 text-white rounded-lg h-[40px] mt-4 font-semibold text-sm md:text-base hover:bg-sky-700"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
