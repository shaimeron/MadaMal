import express from "express";
import {UsersController} from "../controllers";

const router = express.Router();

const usersController = new UsersController();

router.get("/:id", usersController.getById.bind(usersController));

export default router;
