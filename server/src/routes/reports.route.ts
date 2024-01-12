import express from "express";
const router = express.Router();
import { ReportsController } from "../controllers";

const reportsController = new ReportsController();

router.get("/all", reportsController.getAll.bind(reportsController));

router.get("/:id", reportsController.getById.bind(reportsController));

router.post("/", reportsController.createReport.bind(reportsController));

router.put("/:id", reportsController.updateReport.bind(reportsController));

router.delete("/:id", reportsController.deleteById.bind(reportsController));

router.post(
  "/update",
  reportsController.addUpdateToReport.bind(reportsController)
);

router.delete(
  "/update",
  reportsController.deleteUpdateFromReport.bind(reportsController)
);

router.put(
  "/update",
  reportsController.changeUpdateInReport.bind(reportsController)
);

export default router;
