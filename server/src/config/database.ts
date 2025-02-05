import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    try {
        const URL = process.env.MONGO_URL;

        if (!URL) {
            throw new Error("Database url is not define in env file.");
        }

        await mongoose.connect(URL);
        console.log("Successfully connected with the database.");
    } catch (error) {
        console.error("Error while connecting to the DB:", error);
    }
}

export default dbConnect;

