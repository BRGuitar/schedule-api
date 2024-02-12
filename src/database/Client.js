const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllClients = () => {
  try {
    return DB.clients;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneClient = (clientEmail) => {
  try {
    const clientInfo = DB.clients.find(
      (client) => client.email === clientEmail
    );
    if (!clientInfo) {
      throw {
        status: 400,
        message: `Can't find client with Email: '${clientEmail}'`,
      };
    }
    return clientInfo;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const addNewClient = (newClient) => {
  try {
    const clientExists =
      DB.clients.findIndex((client) => client.email === newClient.email) > 1;

    if (clientExists) {
      throw {
        status: 400,
        message: `Client already exists with email: '${newClient.email}'`,
      };
    }

    DB.clients.push(newClient);
    saveToDatabase(DB);

    return newClient;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateClientInfo = (clientEmail, newInfo) => {
  try {
    const indexToUpdate = DB.clients.findIndex(
      (client) => client.email === clientEmail
    );

    if (indexToUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find Client with Email: '${clientEmail}'`,
      };
    }

    const updatedClient = {
      id: DB.clients[indexToUpdate].id,
      firstName: newInfo.firstName
        ? newInfo.firstName
        : DB.clients[indexToUpdate].firstName,
      lastName: newInfo.lastName
        ? newInfo.lastName
        : DB.clients[indexToUpdate].lastName,
      email: newInfo.email ? newInfo.email : DB.clients[indexToUpdate].email,
      phone: newInfo.phone ? newInfo.phone : DB.clients[indexToUpdate].phone,
      password: newInfo.password
        ? newInfo.password
        : DB.clients[indexToUpdate].password,
    };

    DB.clients[indexToUpdate] = updatedClient;
    saveToDatabase(DB);

    return updatedClient;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteClient = (clientId) => {
  try {
    const indexToDelete = DB.clients.findIndex(
      (client) => client.id === clientId
    );

    if (indexToDelete === -1) {
      throw {
        status: 400,
        message: `Can't find Client with Id: '${clientId}'`,
      };
    }

    const deletedClientUsername = DB.clients[indexToDelete].email;
    DB.clients.splice(indexToDelete, 1);
    saveToDatabase(DB);
    return deletedClientUsername;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllClients,
  getOneClient,
  addNewClient,
  updateClientInfo,
  deleteClient,
};
