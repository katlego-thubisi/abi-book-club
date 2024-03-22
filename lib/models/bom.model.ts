import mongoose from "mongoose";
const uuid = require("uuid");

const bomSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4().toString(),
  },
  bookSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookSession",
    required: true,
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
  },
});

const Bom = mongoose.models.Bom || mongoose.model("Bom", bomSchema);

export default Bom;
