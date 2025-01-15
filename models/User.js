import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    cover: { type: String },
    profile: { type: String },
    razorpayId: {type:String},
    razorpaysecret: {type:String},
    createdAt: { type: Date, default: Date.now },
    updtaedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || model("User", userSchema);

export default mongoose.models.User || User;