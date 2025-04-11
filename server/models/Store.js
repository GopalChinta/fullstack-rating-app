// models/Store.js
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
});

const Store = mongoose.model("Store", storeSchema);
export default Store;
