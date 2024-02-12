const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllRecords = () => {
  try {
    return DB.records;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
const getClientRecords = (clientId) => {
  try {
    const clientRecords = DB.records.filter(
      (record) => record.clientId === clientId
    );
    if (clientRecords.length === 0) {
      throw {
        status: 400,
        message: `Can't find any Records for client Id: '${clientId}'`,
      };
    }
    return clientRecords;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
const addNewRecord = (newRecord) => {
  try {
    const isAlreadyAdded =
      DB.records.findIndex(
        (record) => record.appointmentDateTime === newRecord.appointmentDateTime
      ) > 1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Already a record for an Appointment at '${newRecord.appointmentDateTime}'`,
      };
    }

    DB.records.push(newRecord);
    saveToDatabase(DB);

    return newRecord;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllRecords,
  getClientRecords,
  addNewRecord,
};
