import jwt from "jsonwebtoken";

export const veryfiyJWT = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;

    if (!headers) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const token = headers.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const role = req.user.userRole;
    if (role === "admin") {
      return next();
    }

    res.status(403).json({
      success: false,
      message: "forbidden access",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
