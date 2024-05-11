const mongoose = require("mongoose");
const initData = require ("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/explore-muse";
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

let newData = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
}

newData();