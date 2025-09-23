const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Log = require("./models/Log");


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ Connection error:", err);
  process.exit(1);
});

const logsData = JSON.parse(fs.readFileSync("../frontend/src/data/sample.json", "utf-8"));

const migrateLogs = async () => {
  try {
    await Log.insertMany(logsData);
    console.log(`✅ Inserted ${logsData.length} logs into MongoDB`);
  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    mongoose.connection.close();
  }
};

migrateLogs();
