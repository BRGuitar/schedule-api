const express = require("express");
//const apicache = require("apicache");
const recordController = require("../controllers/recordController");

const router = express.Router();
//const cache = apicache.middleware;

//router.get("/", cache("2 minutes"), recordController.getAllRecords);

router.get("/", recordController.getAllRecords);

router.get("/:clientId", recordController.getClientRecords);

router.post("/", recordController.addNewRecord);

module.exports = router;
