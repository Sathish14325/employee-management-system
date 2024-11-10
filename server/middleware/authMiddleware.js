import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (roleRequired) => (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user.role);

    if (roleRequired && req.user.role !== roleRequired) {
      return res
        .status(403)
        .json({ error: "Forbidden: Access restricted to admins only" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid" });
  }
};

export default auth;
