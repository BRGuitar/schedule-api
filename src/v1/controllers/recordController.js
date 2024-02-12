const recordService = require("../services/recordService");

const getAllRecords = (req, res) => {
  try {
    const allRecords = recordService.getAllRecords();
    res.send({ status: "OK", data: allRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const getClientRecords = (req, res) => {
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
    const clientRecords = recordService.getClientRecords(clientId);
    res.send({ status: "OK", data: clientRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const addNewRecord = (req, res) => {
  const { body } = req;

  // Improve validation with ThirdParty package like express-validator
  if (
    !body.clientId ||
    !body.appointmentDateTime ||
    !body.duration ||
    !body.payType ||
    !body.payMethod
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'clientId', 'appointmentDateTime', 'duration', 'payType', 'payMethod', 'paymentAmount'",
      },
    });
  }

  const newRecord = {
    clientId: body.clientId,
    appointmentDateTime: body.appointmentDateTime,
    duration: body.duration,
    payType: body.payType,
    payMethod: body.payMethod,
    paymentAmount: body.paymentAmount,
  };

  try {
    const createdRecord = recordService.addNewRecord(newRecord);
    res.status(201).send({ status: "OK", data: createdRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllRecords,
  getClientRecords,
  addNewRecord,
};
