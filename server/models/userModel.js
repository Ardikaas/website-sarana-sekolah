const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    sarana: {
      type: Array,
      required: [false],
    },
    prasarana: {
      type: Array,
      required: [false],
    },
    sarprasluar: {
      type: Array,
      required: [false],
    },
    kreasiguru: {
      type: Boolean,
      required: [true],
    },
  },
  {
    timestamps: [true],
  }
);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    password: {
      type: String,
      required: [true],
    },
    mapel: {
      type: String,
      required: [false],
      default: "umum",
    },
    role: {
      type: String,
      required: [true],
      enum: ["admin", "kepsek", "guru"],
    },
    history: [reviewSchema],
  },
  {
    timestamps: [true],
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
