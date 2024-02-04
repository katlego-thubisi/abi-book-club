import mongoose from "mongoose";
const { randomUUID } = require("crypto");

const addressSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.UUID,
    default: () => randomUUID(),
    unique: true,
    required: true,
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
