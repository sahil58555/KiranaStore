const mongoose = require("mongoose");
const uri = process.env.DB_URI;
console.log(uri)
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DATABSE CONNECTED"));