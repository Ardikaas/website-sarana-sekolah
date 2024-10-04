const mongoose = require("mongoose");

const saranaItem = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  inUse: {
    type: Boolean,
    required: [true],
  },
  condition: {
    type: Boolean,
    required: [true],
  },
});

const prasaranaItem = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  inUse: {
    type: Boolean,
    required: [true],
  },
  condition: {
    type: Boolean,
    required: [true],
  },
});

const mediaBelajarItem = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  inUse: {
    type: Boolean,
    required: [true],
  },
  condition: {
    type: Boolean,
    required: [true],
  },
});

const sumberBelajarItem = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  inUse: {
    type: Boolean,
    required: [true],
  },
  condition: {
    type: Boolean,
    required: [true],
  },
});

const kelasSchema = mongoose.Schema(
  {
    className: {
      type: String,
      require: [true],
    },
    saranas: [saranaItem],
    prasaranas: [prasaranaItem],
    mediaBelajars: [mediaBelajarItem],
    sumberbelajars: [sumberBelajarItem],
  },
  {
    timestamps: [true],
  }
);

const Kelas = mongoose.model("Kelas", kelasSchema);

module.exports = Kelas;
