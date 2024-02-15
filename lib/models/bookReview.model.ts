import mongoose from "mongoose";
const uuid = require("uuid");

const bookReviewSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4().toString(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const BookReview =
  mongoose.models.BookReview || mongoose.model("BookReview", bookReviewSchema);

export default BookReview;
