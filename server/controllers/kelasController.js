const Kelas = require("../models/kelasModel");

const KelasController = {
  getAllKelas,
  getKelasById,
  createKelas,
  deleteKelas,
};

async function getAllKelas(req, res) {
  try {
    const kelass = await Kelas.find({});
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: kelass,
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

async function getKelasById(req, res) {
  try {
    const kelas = await Kelas.findById(req.params.id);
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: kelas,
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

async function createKelas(req, res) {
  try {
    const kelas = await Kelas.create(req.body);
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: kelas,
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

async function deleteKelas(req, res) {
  try {
    const { id } = req.params;
    const kelas = await Kelas.findByIdAndDelete(id);
    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    res.status(200).json({
      status: {
        code: 200,
        message: "Kelas successfully deleted",
      },
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

module.exports = KelasController;
