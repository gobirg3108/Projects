import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://gobigobi3108:resume31@cluster0.tn1mgsl.mongodb.net/Resume"
    )
    .then(() => console.log("DB Connected"));
};
