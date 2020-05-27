const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//returns promise instead of then and catch, async code.
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    //exit process with fail
    process.exit(1);
  }
};

module.exports = connectDB;
