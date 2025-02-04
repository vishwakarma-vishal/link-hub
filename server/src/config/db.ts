import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect(`${process.env.MONGO_URL}`)
        .then(() => {
            console.log("Successfully connected with the database.");
        })
        .catch((e) => {
            console.log("Error while connecting to the db, " + e);
        });
}

export default dbConnect;

