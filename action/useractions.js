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

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username });
    if (!u) return null; // Handle case where user is not found
    let user = u.toObject(); // Convert to plain object
    user._id = user._id.toString(); // Convert ObjectId to string
    return user;
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
    console.log(await  data)
    let ndata = Object.fromEntries(data);

    // if the username is bieng updated, check if the username is available 
    if (ndata.username !== oldusername) {
        let u = await User.findOne({ username: ndata.username });
        if(u){
            return {error: "Username already exists"};
        }
    }

    await User.updateOne({email: ndata.email},ndata)
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
