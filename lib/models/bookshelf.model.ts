import mongoose from "mongoose";
const uuid = require("uuid");

const bookshelfSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4().toString(),
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bookReviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookReview",
    required: true,
  },
});

const Bookshelf =
  mongoose.models.Boookshelf || mongoose.model("Book", bookshelfSchema);

export default Bookshelf;
