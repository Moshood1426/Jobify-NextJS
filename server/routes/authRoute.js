import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

import rateLimiter from "express-rate-limit";

// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message:
//     "Too many request from this IP address, please try again after 15 mins",
// });

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
