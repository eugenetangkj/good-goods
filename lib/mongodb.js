import mongoose from "mongoose";

let isConnected = false; // Track connection status

const connectToDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
    await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "goodgoods", // Name of your database
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
    } catch (error) {
    console.log("Cannot connect to MongoDB", error);
    }
};

export default connectToDB;
