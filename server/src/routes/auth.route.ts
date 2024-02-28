import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";

/**
 * @swagger
 * api/auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Creates a new user account.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User details.
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               email: awesome@gmail.com
 *               password: pass123
 *               fullname: Awesome User
 *               imageUrl: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 *       400:
 *         description: Bad request. User details are invalid.
 *       406:
 *         description: Email is already exists
 *       500:
 *         description: Internal server error.
 */
router.post("/register", authController.register);
router.post("/google", authController.googleSignin);

/**
 * @swagger
 * api/auth/login:
 *   post:
 *     summary: Login.
 *     description: Logs a user into the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials.
 *       content:
 *         application/json:
 *           example:
 *             username: user123
 *             password: pass123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request. User details are invalid.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * api/auth/logout:
 *   get:
 *     summary: Logout.
 *     description: Logs a user out of the system.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/logout", authController.logout);

/**
 * @swagger
 * api/auth/refresh:
 *   get:
 *     summary: Refresh token.
 *     description: Refreshes a user's token.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *       401:
 *          description: Refresh token is null
 *       500:
 *         description: Internal server error.
 */
router.get("/refresh", authController.refresh);

export default router;
