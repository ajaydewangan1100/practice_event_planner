import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokenData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!tokenData._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = tokenData;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default isLoggedIn;
