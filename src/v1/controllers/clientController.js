const clientService = require("../services/clientService");

const getAllClients = (req, res) => {
  try {
    const clientList = clientService.getAllClients();
    res.send({ status: "OK", data: clientList });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const getOneClient = (req, res) => {
  const {
    params: { clientEmail },
  } = req;
  if (!clientEmail) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':clientEmail' can not be empty" },
    });
  }

  try {
    const clientInfo = clientService.getOneClient(clientEmail);
    res.send({ status: "OK", data: clientInfo });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const addNewClient = (req, res) => {
  const { body } = req;

  // Improve validation with ThirdParty package like express-validator
  if (!body.firstName || !body.lastName || !body.email || !body.phone) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'firstName', 'lastName', 'email', 'phone'",
      },
    });
  }

  const newClient = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
  };

  try {
    const createdClient = clientService.addNewClient(newClient);
    res.status(201).send({ status: "OK", data: createdClient });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const updateClientInfo = (req, res) => {
  const {
    body,
    params: { clientEmail },
  } = req;

  if (
    !clientEmail ||
    (!body.password &&
      !body.firstName &&
      !body.lastName &&
      !body.email &&
      !body.phone)
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Parameter ':clientEmail' can not be empty, and the request body needs to contain at least one field to Update ('firstName', 'lastName', 'email', 'phone', or 'password').",
      },
    });
  }

  try {
    const updatedClient = clientService.updateClientInfo(clientEmail, body);
    res.send({ status: "OK", data: updatedClient });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const deleteClient = (req, res) => {
  const {
    params: { clientId },
  } = req;
  if (!clientId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':clientId' can not be empty" },
    });
  }

  try {
    const deletedClientUsername = clientService.deleteClient(clientId);
    res.status(200).send({
      status: "OK",
      message: `Deleted client: '${deletedClientUsername}'`,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllClients,
  getOneClient,
  addNewClient,
  updateClientInfo,
  deleteClient,
};
