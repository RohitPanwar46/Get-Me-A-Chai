"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

export const intiate = async (amount, to_username, paymentform) => {
    await connectDB();
    let razorpay = await User.findOne({username:to_username})
    var instance = new Razorpay({ key_id: razorpay.razorpayId, key_secret: razorpay.razorpaysecret });

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    let x = await instance.orders.create(options);

    await Payment.create({ oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message });

    console.log(to_username);

    return x;
}

export const fetchuser = async (username,email) => {
    await connectDB();

    // Try finding the user in the database
    let u = await User.findOne({ username: username });

    // If the user doesn't exist, create a new one and save it
    if (!u) {
        u = await User.create({ username: username,email:email });
    }

    // Convert the user document to a plain object
    let user = u.toObject();
    user._id = user._id.toString(); // Convert ObjectId to string
    return user; // Return the user data
};


export const fetchpayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 }) // Sort by amount in descending order
        .limit(10) // Limit results to top 10
        .lean(); // Convert to plain objects
    return payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(), // Convert ObjectId to string
    }));
};


export const updateprofile = async (data, oldusername) => {
    await connectDB();
    console.log(data);

    // Ensure data is an object
    const ndata = { ...data };

    // If the username is being updated, check if the new username is available
    if (ndata.username !== oldusername) {
        const existingUser = await User.findOne({ username: ndata.username });
        if (existingUser) {
            return { error: "Username already exists" };
        }
    }

    // Update the user profile based on the email
    await User.updateOne({ email: ndata.email }, ndata);
    return { success: true }; // Indicate successful update
};

export const fetchTotalPayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, done: true })
        .lean(); // Convert to plain objects
    return payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(), // Convert ObjectId to string
    }));
};
