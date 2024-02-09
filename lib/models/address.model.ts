import mongoose from "mongoose";
const { randomUUID } = require("crypto");
const uuid = require("uuid");

const addressSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4().toString(),
  },
  streetLine1: {
    type: String,
    required: true,
  },
  streetLine2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  isPrimary: {
    type: Boolean,
    default: true,
  },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
