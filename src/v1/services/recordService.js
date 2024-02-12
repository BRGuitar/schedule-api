const { v4: uuid } = require("uuid");
const Record = require("../../database/Record");

const getAllRecords = () => {
  try {
    const allRecords = Record.getAllRecords();
    return allRecords;
  } catch (error) {
    throw error;
  }
};

const getClientRecords = (clientId) => {
  try {
    const clientRecords = Record.getClientRecords(clientId);
    return clientRecords;
  } catch (error) {
    throw error;
  }
};

const addNewRecord = (newRecord) => {
  const recordToInsert = {
    id: uuid(),
    ...newRecord,
    paymentAmount: getApptCost(newRecord.duration, newRecord.payType),
  };

  try {
    const createdRecord = Record.addNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

function getApptCost(duration, payType) {
  switch (payType) {
    case "FirstTime":
      return 10;
    case "Single":
      return duration === 30 ? 15 : 20;
    case "4Pack":
      return duration === 30 ? 50 : 60;
    default:
      return 0;
  }
}

module.exports = {
  getAllRecords,
  getClientRecords,
  addNewRecord,
};
