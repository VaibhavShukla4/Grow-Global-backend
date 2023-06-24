const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("./Middleware/errorHandler");
const routes = require("./Routes/index");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI;
const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((error) => {
    console.log("No Connection", error);
  });
// mongoose
//   .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
