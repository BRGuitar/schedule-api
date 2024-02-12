const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

// Add middleware to Authenticate/Authorize requests coming in

router.get("/", clientController.getAllClients);

router.get("/:clientEmail", clientController.getOneClient);

//router.post("/", clientController.addNewClient);

router.patch("/:clientEmail", clientController.updateClientInfo);

router.delete("/:clientId", clientController.deleteClient);

module.exports = router;
