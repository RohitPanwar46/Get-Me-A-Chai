import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String, required: true },
    amount: { type: Number, required: true },
    razorpayId: {type:String},
    razorpaysecret: {type:String},
    createdAt: { type: Date, default: Date.now },
    updtaedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
});

const Payment = mongoose.models.Payment || model("Payment", paymentSchema);

export default Payment;