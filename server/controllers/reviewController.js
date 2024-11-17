const Kelas = require("../models/kelasModel");
const User = require("../models/userModel");

const ReviewController = {
  addReview,
  historyReview,
  historyReviewId,
};

async function addReview(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Invalid user information",
        },
      });
    }

    const { id } = req.params;
    const userId = req.user._id;
    const { reviews } = req.body;
    const kelas = await Kelas.findById(id);
    const user = await User.findById(userId);

    if (!kelas || !reviews || !Array.isArray(reviews)) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Invalid data or class not found",
        },
      });
    }

    let itemFoundInCategory = false;

    for (const review of reviews) {
      const {
        itemId,
        condition,
        good_quantity,
        bad_quantity,
        total_quantity,
        additional,
      } = review;
      const categoryList = [
        "saranas",
        "prasaranas",
        "mediaBelajars",
        "sumberBelajars",
      ];

      itemFoundInCategory = false;

      for (const category of categoryList) {
        const item = kelas[category].id(itemId);
        if (item) {
          itemFoundInCategory = true;

          // Untuk sarana dan prasarana, kita hanya update kuantitas
          if (category === "saranas" || category === "prasaranas") {
            if (good_quantity !== undefined) {
              item.good_quantity = good_quantity;
            }
            if (bad_quantity !== undefined) {
              item.bad_quantity = bad_quantity;
            }
            if (total_quantity !== undefined) {
              item.total_quantity = total_quantity;
            }
            if (additional !== undefined) {
              item.additional = additional;
            }
            item.updatedAt = new Date();
          } else {
            if (
              condition !== undefined &&
              item.condition.toString() !== condition
            ) {
              item.condition = condition === "true";
              item.updatedAt = new Date();
            }
            if (good_quantity !== undefined) {
              item.good_quantity = good_quantity;
            }
            if (bad_quantity !== undefined) {
              item.bad_quantity = bad_quantity;
            }
            if (total_quantity !== undefined) {
              item.total_quantity = total_quantity;
            }
            if (additional !== undefined) {
              item.additional = additional;
            }
            item.updatedAt = new Date();
          }
          break;
        }
      }

      if (!itemFoundInCategory) {
        return res.status(404).json({
          status: {
            code: 404,
            message: `Item with ID ${itemId} not found`,
          },
        });
      }
    }

    const historyEntry = {
      className: kelas.className,
      classId: kelas._id,
      sarana: kelas.saranas.map((item) => ({
        itemName: item.name,
        good_quantity: item.good_quantity,
        bad_quantity: item.bad_quantity,
        total_quantity: item.total_quantity,
        additional: item.additional,
        reviewedAt: new Date(),
      })),
      prasarana: kelas.prasaranas.map((item) => ({
        itemName: item.name,
        good_quantity: item.good_quantity,
        bad_quantity: item.bad_quantity,
        total_quantity: item.total_quantity,
        additional: item.additional,
        reviewedAt: new Date(),
      })),
      mediaBelajar: kelas.mediaBelajars.map((item) => ({
        itemName: item.name,
        condition: item.condition.toString(),
        reviewedAt: new Date(),
      })),
      sumberBelajar: kelas.sumberBelajars.map((item) => ({
        itemName: item.name,
        condition: item.condition.toString(),
        reviewedAt: new Date(),
      })),
      reviewedAt: new Date(),
    };

    user.history.push(historyEntry);

    await kelas.save();
    await user.save();

    return res.status(200).json({
      status: {
        code: 200,
        message: "Review successfully added",
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

async function historyReview(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Invalid user information",
        },
      });
    }

    const userId = req.user._id;
    const user = await User.findById(userId).select("history");

    if (!user) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "User not found",
        },
      });
    }

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user.history,
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

async function historyReviewId(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("history");

    if (!user) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "User not found",
        },
      });
    }

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user.history,
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

module.exports = ReviewController;
