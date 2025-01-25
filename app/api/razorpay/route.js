import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";


export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if razorpayOrderId is present in the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    let razorpay = await User.findOne({username:p.to_user})
    console.log("Found Payment:", p);
    if (!p) {
        console.log("Order ID not found"); 
        return NextResponse.json({ success: false, message: "Order ID not found" });
    }

    try {
        // Verify the payment
        let xx = validatePaymentVerification(
            { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
            body.razorpay_signature,
            razorpay.razorpaysecret
        );

        if (!xx) {
            throw new Error("Payment verification failed");
        }

        // Update the payment status
        let updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );

        if (!updatedPayment) {
            console.error("Payment document not found or updated.");
            return NextResponse.json({ success: false, message: "Order update failed" });
        }

        return NextResponse.redirect(
                `https://get-me-a-chai-rho.vercel.app/${updatedPayment?.to_user}?paymentdone=true`
        );
    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json({ success: false, message: error.message });
    }
    
};
