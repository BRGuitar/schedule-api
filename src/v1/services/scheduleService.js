const { v4: uuid } = require("uuid");
const Schedule = require("../../database/Schedule");

const getAllAppointments = () => {
  try {
    const allAppointments = Schedule.getAllAppointments();
    return allAppointments;
  } catch (error) {
    throw error;
  }
};

const getClientAppointments = (clientUsername) => {
  try {
    const clientAppointments = Schedule.getClientAppointments(clientUsername);
    return clientAppointments;
  } catch (error) {
    throw error;
  }
};

const addNewAppointment = (newAppointment) => {
  const appointmentToInsert = {
    id: uuid(),
    ...newAppointment,
  };

  try {
    const createdAppointment = Schedule.addNewAppointment(appointmentToInsert);
    return createdAppointment;
  } catch (error) {
    throw error;
  }
};

const updateAppointmentPayment = (appointmentId, paymentDetails) => {
  try {
    const updatedAppointment = Schedule.updateAppointmentPayment(
      appointmentId,
      paymentDetails
    );
    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};

const deleteAppointment = (appointmentId) => {
  try {
    Schedule.deleteAppointment(appointmentId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAppointments,
  getClientAppointments,
  addNewAppointment,
  updateAppointmentPayment,
  deleteAppointment,
};
