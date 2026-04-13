import connectDB from "./db/index.js";
import app from "./app.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 8000;

console.log("Index js is running,!!");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting db ,inside index.js," + error);
  });
