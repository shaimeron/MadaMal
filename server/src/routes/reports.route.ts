import express from "express";
const router = express.Router();
import { ReportsController } from "../controllers";

const reportsController = new ReportsController();

/**
 * @swagger
 * /reports/all:
 *   get:
 *     summary: Retrieve all reports.
 *     description: Fetches a list of all reports in the system.
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: A list of reports.
 *       500:
 *         description: Internal server error.
 */
router.get("/all", reportsController.getAll.bind(reportsController));

/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Retrieve a report by its ID.
 *     description: Fetches a specific report by its unique identifier.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Unique identifier of the report to retrieve.
 *     responses:
 *       200:
 *         description: Report details.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", reportsController.getById.bind(reportsController));

/**
 * @swagger
 * /reports/:
 *   post:
 *     summary: Create a new report.
 *     description: Adds a new report to the system.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ownerId: 5f8f1a8b0f1b5b1b7c9bce1a
 *             data: This is a report.
 *             imageName: image.jpeg.
 *
 *     responses:
 *       201:
 *         description: Report created successfully.
 *       400:
 *         description: Invalid input, object invalid.
 *       500:
 *         description: Internal server error.
 */
router.post("/", reportsController.createReport.bind(reportsController));

/**
 * @swagger
 * /reports/:
 *   put:
 *     summary: Update an existing report.
 *     description: Updates an existing report in the system.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             _id: 5f8f1a8b0f1b5b1b7c9bce1a
 *             data: This is a report.
 *             imageName: image.jpeg.
 *     responses:
 *       200:
 *         description: Report updated successfully.
 *       400:
 *         description: Invalid input, object invalid.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/", reportsController.updateReport.bind(reportsController));

/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Delete a report.
 *     description: Deletes a report from the system by its ID.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Unique identifier of the report to delete.
 *     responses:
 *       200:
 *         description: Report deleted successfully.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", reportsController.deleteById.bind(reportsController));

/**
 * @swagger
 * /reports/updates/{reportId}:
 *   get:
 *     summary: Retrieve all updates in report by its ID.
 *     description: Fetches all updates from a specific report by the report unique identifier.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         type: string
 *         description: Unique identifier of the report to retrieve.
 *     responses:
 *       200:
 *         description: report updates details.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/update/:reportId",
  reportsController.getUpdatesByReportId.bind(reportsController)
);

/**
 * @swagger
 * /reports/update:
 *   post:
 *     summary: Add an update to a report.
 *     description: Adds a new update to a report.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ownerId: 5f8f1a8b0f1b5b1b7c9bce1a
 *             data: This is a report.
 *             reportId: 5f8f1a8b0f1b5b1b7c9bce1a
 *
 *     responses:
 *       201:
 *         description: Report update created successfully.
 *       400:
 *         description: Invalid input, object invalid.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/update",
  reportsController.addUpdateToReport.bind(reportsController)
);

/**
 * @swagger
 * /reports/update/{reportId}/{updateId}:
 *   delete:
 *     summary: Delete an update from a report.
 *     description: Deletes an update from a report by its ID.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         type: string
 *         description: Unique identifier of the report.
 *       - in: path
 *         name: updateId
 *         required: true
 *         type: string
 *         description: Unique identifier of the update to delete.
 *     responses:
 *       200:
 *         description: Report update deleted successfully.
 *       404:
 *         description: Report update not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/update/:reportId/:updateId",
  reportsController.deleteUpdateFromReport.bind(reportsController)
);

/**
 * @swagger
 * /reports/update:
 *   put:
 *     summary: Update an existing report update.
 *     description: Updates an existing report update in the system.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             reportId: 5f8f1a8b0f1b5b1b7c9bce1a
 *             _id: 5f8f1a8b0f1b5b1b7c9bce1b
 *             data: This is an updated report update.
 *     responses:
 *       200:
 *         description: Report update updated successfully.
 *       400:
 *         description: Invalid input, object invalid.
 *       404:
 *         description: Report update not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update",
  reportsController.changeUpdateInReport.bind(reportsController)
);

export default router;
