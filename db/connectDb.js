import mongoose from 'mongoose';

let isConnected = false; // Track the connection state

const connectDB = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB.");
        return;
    }

    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/chai`, {
            serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
        });

        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
