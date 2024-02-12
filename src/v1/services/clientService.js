const { v4: uuid } = require("uuid");
const Client = require("../../database/Client");

const getAllClients = () => {
  try {
    const clientList = Client.getAllClients();
    return clientList;
  } catch (error) {
    throw error;
  }
};

const getOneClient = (clientEmail) => {
  try {
    const clientInfo = Client.getOneClient(clientEmail);
    return clientInfo;
  } catch (error) {
    throw error;
  }
};

const addNewClient = (newClient) => {
  const clientToInsert = {
    id: uuid(),
    ...newClient,
  };

  try {
    const createdClient = Client.addNewClient(clientToInsert);
    return createdClient;
  } catch (error) {
    throw error;
  }
};

const updateClientInfo = (clientEmail, newInfo) => {
  try {
    const updatedClient = Client.updateClientInfo(clientEmail, newInfo);
    return updatedClient;
  } catch (error) {
    throw error;
  }
};

const deleteClient = (clientId) => {
  try {
    const deletedClientUsername = Client.deleteClient(clientId);
    return deletedClientUsername;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClients,
  getOneClient,
  addNewClient,
  updateClientInfo,
  deleteClient,
};
