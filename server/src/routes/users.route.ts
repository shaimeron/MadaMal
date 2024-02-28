import express from "express";
import { UsersController } from "../controllers";
import { authMiddleware } from "../common";

const router = express.Router();

const usersController = new UsersController();

/**
 * @swagger
 * api/users/{id}:
 *   get:
 *     summary: Retrieve a user by their ID.
 *     description: Fetches a specific user's details by their unique identifier. Requires authentication.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Unique identifier of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  authMiddleware,
  usersController.getById.bind(usersController)
);

/**
 * @swagger
 * api/users/update:
 *   get:
 *     summary: Retrieve a user to update.
 *     description: Upates user details.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Unique identifier of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

router.put(
  '/update',
  authMiddleware,
  usersController.updateUser.bind(usersController)
);

export default router;
