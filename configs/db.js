import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to local MongoDB"))
    .catch((err) => console.error("Could not connect to local MongoDB:", err));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose default connection open");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose default connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
  });

  // Close the Mongoose connection when the Node.js process exits
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
};

export default connectDB;
