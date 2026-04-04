import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      trim: true,
      min: [1, "Amount must be greater than 0"],
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      lowercase: true,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },

    date: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date cannot be in the future",
      },
    },

    note: {
      type: String,
      default: "",
      trim: true,
      maxlength: [300, "Note cannot exceed 300 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// index
transactionSchema.index({ user: 1, date: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;