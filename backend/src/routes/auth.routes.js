import { Router } from "express";

import {
  authLoginController,
  authRegisterController,
  authLogoutController,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */

router.post("/login", authLoginController);

/**
 * @route POST /api/auth/register
 * @desc Register a new user and return JWT token
 * @access Public
 */
router.post("/register", authRegisterController);

/**
 * @route POST /api/auth/logout
 * @desc Logout user and invalidate JWT token
 * @access Private
 */
router.post("/logout", authMiddleware, authLogoutController);

export default router;
