import mongoose from 'mongoose';

let isConnected = false; // Global variable to track connection status

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection.");
        return;
    }

    try {
        if (mongoose.connection.readyState === 1) {
            // If there's already an open connection, use it
            console.log("Reusing existing MongoDB connection.");
            isConnected = true;
            return;
        }

        // Otherwise, create a new connection
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        });

        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
