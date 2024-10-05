const Kelas = require("../models/kelasModel");

const KelasController = {
  getAllKelas,
  getKelasById,
  createKelas,
  deleteKelas,
  addSarana,
  deleteSarana,
  addPrasarana,
  deletePrasarana,
  addMediaBelajar,
  deleteMediaBelajar,
  addSumberBelajar,
  deleteSumberBelajar,
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

async function addSarana(req, res) {
  try {
    const { id } = req.params;
    const { name, inUse, condition } = req.body;

    const kelas = await Kelas.findById(id);
    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    kelas.saranas.push({
      name,
      inUse,
      condition,
    });

    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Sarana successfully added",
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

async function deleteSarana(req, res) {
  try {
    const { id, saranasId } = req.params;
    const kelas = await Kelas.findById(id);

    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    const saranaIndex = kelas.saranas.findIndex(
      (sarana) => sarana._id.toString() === saranasId
    );

    if (saranaIndex === -1) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any Sarana with ID ${id}`,
        },
      });
    }

    kelas.saranas.splice(saranaIndex, 1);
    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Sarana successfully deleted",
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

async function addPrasarana(req, res) {
  try {
    const { id } = req.params;
    const { name, inUse, condition } = req.body;

    const kelas = await Kelas.findById(id);
    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    kelas.prasaranas.push({
      name,
      inUse,
      condition,
    });

    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Prasarana successfully added",
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

async function deletePrasarana(req, res) {
  try {
    const { id, prasaranasId } = req.params;
    const kelas = await Kelas.findById(id);

    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    const prasaranaIndex = kelas.prasaranas.findIndex(
      (prasarana) => prasarana._id.toString() === prasaranasId
    );

    if (prasaranaIndex === -1) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any Prasarana with ID ${id}`,
        },
      });
    }

    kelas.prasaranas.splice(prasaranaIndex, 1);
    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Prasarana successfully deleted",
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

async function addMediaBelajar(req, res) {
  try {
    const { id } = req.params;
    const { name, inUse, condition } = req.body;

    const kelas = await Kelas.findById(id);
    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    kelas.mediaBelajars.push({
      name,
      inUse,
      condition,
    });

    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Media Belajar successfully added",
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

async function deleteMediaBelajar(req, res) {
  try {
    const { id, mediabelajarsId } = req.params;
    const kelas = await Kelas.findById(id);

    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    const mediaBelajarIndex = kelas.mediaBelajars.findIndex(
      (mediaBelajar) => mediaBelajar._id.toString() === mediabelajarsId
    );

    if (mediaBelajarIndex === -1) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any Media Belajar with ID ${id}`,
        },
      });
    }

    kelas.mediaBelajars.splice(mediaBelajarIndex, 1);
    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Media Belajar successfully deleted",
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

async function addSumberBelajar(req, res) {
  try {
    const { id } = req.params;
    const { name, inUse, condition } = req.body;

    const kelas = await Kelas.findById(id);
    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    kelas.sumberBelajars.push({
      name,
      inUse,
      condition,
    });

    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Sumber Belajar successfully added",
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

async function deleteSumberBelajar(req, res) {
  try {
    const { id, sumberbelajarsId } = req.params;
    const kelas = await Kelas.findById(id);

    if (!kelas) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any kelas with ID ${id}`,
        },
      });
    }

    const sumberBelajarIndex = kelas.sumberBelajars.findIndex(
      (sumberBelajar) => sumberBelajar._id.toString() === sumberbelajarsId
    );

    if (sumberBelajarIndex === -1) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any Sumber Belajar with ID ${id}`,
        },
      });
    }

    kelas.sumberBelajars.splice(sumberBelajarIndex, 1);
    await kelas.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Sumber Belajar successfully deleted",
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
