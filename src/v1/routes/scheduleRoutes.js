const express = require("express");
const scheduleController = require("../controllers/scheduleController");

const router = express.Router();

/**
 * @openapi
 * /api/v1/schedule:
 *   get:
 *     tags:
 *       - Schedule
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Schedule"
 */

router.get("/", scheduleController.getAllAppointments);

router.get("/:clientUsername", scheduleController.getClientAppointments);

router.post("/", scheduleController.addNewAppointment);

router.delete("/:appointmentId", scheduleController.deleteAppointment);

//router.patch("/:appointmentId", scheduleController.updateAppointmentPayment);

module.exports = router;
