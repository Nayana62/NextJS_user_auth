import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const con = mongoose.connection;
    con.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    con.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
