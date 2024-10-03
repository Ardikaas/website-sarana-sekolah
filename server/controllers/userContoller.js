const User = require("../models/userModel.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKENPASS, { expiresIn: "1h" });
};

const UserController = {
  getAllUser,
  getUserByMapel,
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
};

async function getAllUser(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: users,
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

async function getUserByMapel(req, res) {
  try {
    const user = await User.findOne({ mapel: req.params.mapel }).select(
      "-password"
    );

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
      data: user,
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

async function createUser(req, res) {
  try {
    const { username, mapel, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Username already exist",
        },
      });
    }

    const plainPassword = crypto.randomBytes(3).toString("hex");
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      mapel,
      role,
    });

    const user = await newUser.save();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: {
        username: user.username,
        plainPassword: plainPassword,
        password: hashedPassword,
        role: user.role,
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

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any user with ID ${id}`,
        },
      });
    }

    res.status(200).json({
      status: {
        code: 200,
        message: "User successfully deleted",
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

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "User not found",
        },
      });
    }

    const passValidation = await bcrypt.compare(password, user.password);
    if (!passValidation) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "Password tidak valid",
        },
      });
    }

    const token = createToken(user._id);
    res.status(200).json({
      status: {
        code: 200,
        message: "Login Success",
      },
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      token,
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

async function logoutUser(req, res) {
  res.clearCookies("token");
  res.status(200).json({
    status: {
      code: 200,
      message: "Logout Success",
    },
  });
}

module.exports = UserController;
