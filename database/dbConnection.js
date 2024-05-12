import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_JOB_SEEKING",
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(`swome error occured while connecting to database :${err}`);
    });
};
