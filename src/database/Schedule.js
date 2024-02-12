const DB = require("./db.json");
const { v4: uuid } = require("uuid");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: jdoe@gmail.com
 *         phone:
 *           type: string
 *           example: 4195555555
 *         startTime:
 *           type: string
 *           example: 4/20/2022, 5:00:00 PM
 *         duration:
 *           type: string
 *           example: 50
 *
 */

const getAllAppointments = () => {
  try {
    return DB.schedule;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getClientAppointments = (clientUsername) => {
  try {
    const clientAppointments = DB.schedule.filter(
      (appt) => appt.email === clientUsername
    );
    if (clientAppointments.length === 0) {
      throw {
        status: 400,
        message: `Can't find any appointments for client: '${clientUsername}'`,
      };
    }
    return clientAppointments;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const addNewAppointment = (newAppointment) => {
  try {
    const isAlreadyAdded =
      DB.schedule.findIndex(
        (appt) => appt.startTime === newAppointment.startTime
      ) > 1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Already a Lesson scheduled for '${newAppointment.startTime}'`,
      };
    }

    const isNewClient =
      DB.clients.findIndex(
        (client) => client.email === newAppointment.email
      ) === -1;

    if (isNewClient) {
      DB.clients.push({
        id: uuid(),
        firstName: newAppointment.firstName,
        lastName: newAppointment.lastName,
        email: newAppointment.email,
        phone: newAppointment.phone,
        password: "",
      });
    }

    DB.schedule.push(newAppointment);
    saveToDatabase(DB);

    return newAppointment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateAppointmentPayment = (appointmentId, paymentDetails) => {
  try {
    const indexToUpdate = DB.schedule.findIndex(
      (appt) => appt.id === appointmentId
    );

    if (indexToUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find appointment with Id: '${appointmentId}'`,
      };
    }

    const updatedAppointment = {
      ...DB.schedule[indexToUpdate],
      ...paymentDetails,
    };

    DB.schedule[indexToUpdate] = updatedAppointment;
    saveToDatabase(DB);

    return updatedAppointment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteAppointment = (appointmentId) => {
  try {
    const indexToDelete = DB.schedule.findIndex(
      (appt) => appt.id === appointmentId
    );

    if (indexToDelete === -1) {
      throw {
        status: 400,
        message: `Can't find appointment with Id: '${appointmentId}'`,
      };
    }

    DB.schedule.splice(indexToDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllAppointments,
  addNewAppointment,
  getClientAppointments,
  updateAppointmentPayment,
  deleteAppointment,
};
