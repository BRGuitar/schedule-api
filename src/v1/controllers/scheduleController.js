const scheduleService = require("../services/scheduleService");

const getAllAppointments = (req, res) => {
  try {
    const allAppointments = scheduleService.getAllAppointments();
    res.send({ status: "OK", data: allAppointments });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getClientAppointments = (req, res) => {
  const {
    params: { clientUsername },
  } = req;
  if (!clientUsername) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':clientUsername' can not be empty" },
    });
  }

  try {
    const clientAppointments =
      scheduleService.getClientAppointments(clientUsername);
    res.send({ status: "OK", data: clientAppointments });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const addNewAppointment = (req, res) => {
  const { body } = req;

  // Improve validation with ThirdParty package like express-validator
  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.phone ||
    !body.startTime ||
    !body.duration
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'firstName', 'lastName', 'email', 'phone', 'startTime', 'duration'",
      },
    });
    return;
  }

  const newAppointment = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    startTime: body.startTime,
    duration: body.duration,
  };

  try {
    const createdAppointment =
      scheduleService.addNewAppointment(newAppointment);
    res.status(201).send({ status: "OK", data: createdAppointment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAppointmentPayment = (req, res) => {
  const {
    body,
    params: { appointmentId },
  } = req;

  if (
    !appointmentId ||
    !body.payType ||
    !body.payMethod ||
    !body.paymentAmount
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Parameter ':appointmentId' can not be empty, and the request body needs the following keys: 'payType', 'payMethod', and 'paymentAmount'",
      },
    });
  }

  try {
    const updatedAppointment = scheduleService.updateAppointmentPayment(
      appointmentId,
      body
    );
    res.send({ status: "OK", data: updatedAppointment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteAppointment = (req, res) => {
  const {
    params: { appointmentId },
  } = req;
  if (!appointmentId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':appointmentId' can not be empty" },
    });
  }

  try {
    scheduleService.deleteAppointment(appointmentId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllAppointments,
  getClientAppointments,
  addNewAppointment,
  updateAppointmentPayment,
  deleteAppointment,
};
