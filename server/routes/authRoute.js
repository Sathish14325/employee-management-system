import express from "express";
import {
  login,
  register,
  dashboard,
  logout,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

// Only admins can access the dashboard
router.get("/dashboard", auth("admin"), dashboard);

export default router;
