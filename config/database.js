const mongoose = require("mongoose");
// require("dotenv").config();
// dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));
