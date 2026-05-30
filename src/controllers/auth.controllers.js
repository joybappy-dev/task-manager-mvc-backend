import User from "../models/users.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check duplicate user
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
    };
    const createdUser = await User.create(newUser);
    res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "server error: " + err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password: plainTextPassword } = req.body;

    // check if user exists in db
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid credential",
      });
    }

    // check password
    const isValidPassword = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "invalid credential",
      });
    }

    // check login user route using thunder
    res.send("Login successful");
  } catch (err) {
    res.status(500).json({
      message: "server error: " + err.message,
    });
  }
};
