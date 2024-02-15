import mongoose from "mongoose";
const uuid = require("uuid");

const addressSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4().toString(),
  },
  book_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  blurb: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
