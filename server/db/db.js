const mongoose = require("mongoose");
const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Db Connected");
    return connection;
  } catch (err) {
    console.error("Db connection err", err);
    throw err;
  }
};
module.exports = { db };
