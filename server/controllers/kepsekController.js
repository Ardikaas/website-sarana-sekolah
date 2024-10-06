const Kepsek = require("../models/kepsekModel");

const KepsekController = {
  getAllNilai,
  addNilai,
};

async function getAllNilai(req, res) {
  try {
    const nilai = await Kepsek.find();
    res.status(200).json({
      status: {
        code: 200,
        message: "Data berhasil diambil",
      },
      data: nilai,
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        message: error.message,
      },
    });
  }
}

async function addNilai(req, res) {
  try {
    const {
      namaGuru,
      mapel,
      kelas,
      level,
      sarana,
      prasarana,
      mebel,
      subel,
      kreagu,
      tanggal,
      jam,
    } = req.body;

    if (
      !namaGuru ||
      !mapel ||
      !kelas ||
      !level ||
      typeof sarana !== "boolean" ||
      typeof prasarana !== "boolean" ||
      typeof mebel !== "boolean" ||
      typeof subel !== "boolean" ||
      typeof kreagu !== "boolean" ||
      !tanggal ||
      !jam
    ) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Data yang dikirim tidak valid",
        },
      });
    }

    const nilaiBaru = new Kepsek({
      namaGuru,
      mapel,
      kelas,
      level,
      sarana,
      prasarana,
      mebel,
      subel,
      kreagu,
      tanggal,
      jam,
    });

    await nilaiBaru.save();

    res.status(201).json({
      status: {
        code: 201,
        message: "Nilai berhasil ditambahkan",
      },
      data: nilaiBaru,
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        message: error.message,
      },
    });
  }
}

module.exports = KepsekController;
