"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, updateprofile } from "@/action/useractions";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Link from "next/link";

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
    console.log("Current status:", status);
    if (status === "authenticated") {
      getData();
    } else if (status === "unauthenticated") {
      console.error("User is not authenticated.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const response = await updateprofile(form, session.user.name);
    if (response && response.error) {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.success("Profile updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const getData = async () => {
    if (status === "authenticated" && session.user) {
        console.log(form.email)
        let u = await fetchuser(session.user.name, form.email); // Pass both username and email
        console.log(u)
        setForm(u);
    }
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
        action={saveProfile} // Using the saveProfile function as the form action
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
              value={form[name] || ""} // Provide a default value to avoid "undefined"
              onChange={handleChange}
              className="h-[36px] bg-gray-700 text-white rounded-lg px-3 text-sm md:text-base"
              type={type}
              name={name}
              id={name}
            />
          </div>
        ))}

        
          <button
          className="w-full bg-sky-800 text-white rounded-lg h-[35px] mt-4 font-semibold text-sm md:text-base hover:bg-sky-700"
          type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
