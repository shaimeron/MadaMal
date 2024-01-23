import express from "express";
import {UsersController} from "../controllers";
import {authMiddleware} from "../common";

const router = express.Router();

const usersController = new UsersController();

router.get("/:id", authMiddleware, usersController.getById.bind(usersController));

export default router;
