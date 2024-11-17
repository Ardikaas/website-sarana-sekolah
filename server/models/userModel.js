const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    sarana: [
      {
        itemName: {
          type: String,
          required: [true],
        },
        good_quantity: {
          type: Number,
          required: [false],
          default: null,
        },
        bad_quantity: {
          type: Number,
          required: [false],
          default: null,
        },
        total_quantity: {
          type: Number,
          required: [true],
        },
        additional: {
          type: String,
          required: [false],
        },
      },
    ],
    prasarana: [
      {
        itemName: {
          type: String,
          required: [true],
        },
        good_quantity: {
          type: Number,
          required: [false],
          default: null,
        },
        bad_quantity: {
          type: Number,
          required: [false],
          default: null,
        },
        total_quantity: {
          type: Number,
          required: [true],
        },
        additional: {
          type: String,
          required: [false],
        },
      },
    ],
    mediaBelajar: [
      {
        itemName: {
          type: String,
          required: [true],
        },
        condition: {
          type: String,
          required: [true],
        },
        reviewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    sumberBelajar: [
      {
        itemName: {
          type: String,
          required: [true],
        },
        condition: {
          type: String,
          required: [true],
        },
        reviewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
