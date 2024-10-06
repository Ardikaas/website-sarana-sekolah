const mongoose = require("mongoose");

const kepsekSchema = mongoose.Schema({
  namaGuru: {
    type: String,
    required: [true],
  },
  mapel: {
    type: String,
    required: [true],
  },
  kelas: {
    type: String,
    required: [true],
  },
  level: {
    type: Number,
    required: [true],
  },
  sarana: {
    type: Boolean,
    required: [true],
  },
  prasarana: {
    type: Boolean,
    required: [true],
  },
  mebel: {
    type: Boolean,
    required: [true],
  },
  subel: {
    type: Boolean,
    required: [true],
  },
  kreagu: {
    type: Boolean,
    required: [true],
  },
  tanggal: {
    type: String,
    required: [true],
  },
  jam: {
    type: String,
    required: [true],
  },
});

const Kepsek = mongoose.model("Kepsek", kepsekSchema);

module.exports = Kepsek;
