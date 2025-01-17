const mongoose = require("mongoose");
require("dotenv").config();
const MongoDBUri = process.env.MongoDBUri;
const connectDB = async () => {
  try {
    await mongoose.connect(MongoDBUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
