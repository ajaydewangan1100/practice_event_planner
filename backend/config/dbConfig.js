import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => console.error(err));
};

export default dbConnection;
