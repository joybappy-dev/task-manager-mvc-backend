import User from "../models/users.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = {
      name,
      email,
      password,
      role,
    };
    const createdUser = await User.create(newUser);
    res.status(200).json({
      success: true,
      message: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error: " + err.message,
    });
  }
};
