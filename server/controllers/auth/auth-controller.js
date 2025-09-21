const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const registerUser = async (req, res) => {

  const { userName, email, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword, // ✅ correct field
    });


    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error("Error in registerUser:", e.message);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};


module.exports = { registerUser };
