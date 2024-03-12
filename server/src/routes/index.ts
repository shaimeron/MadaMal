import reportsRoute from "./reports.route";
import authRoute from "./auth.route";
import imageRoute from "./image.route";
import usersRoute from "./users.route";
import express from "express";

const router = express.Router();

router.use("/reports", reportsRoute);
router.use("/auth", authRoute);
router.use("/image", imageRoute);
router.use("/users", usersRoute);

export default router;