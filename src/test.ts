import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient
} from "./lib/patients.js";

import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor
} from "./lib/doctors.js";

import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment
} from "./lib/appointments.js";

async function main() {
  console.log("Starting CRUD tests...");

  // Patient tests
  const patient = await createPatient({
    name: "Test Patient",
    email: `test${Date.now()}@example.com`,
    phone: "9876543210"
  });

  console.log("Patient created:", patient.name);

  await getPatient(patient.id);
  await searchPatients("Test");
  await updatePatientPhone(patient.id, "9999999999");

  // Doctor tests
  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "Cardiology",
    email: `doctor${Date.now()}@hospital.io`
  });

  console.log("Doctor created:", doctor.name);

  await getDoctor(doctor.id);
  await listDoctorsBySpecialty("Cardiology");

  // Appointment tests
  const appointment = await bookAppointment(
    patient.id,
    doctor.id,
    new Date(Date.now() + 86400000),
    "Test appointment"
  );

  console.log("Appointment booked:", appointment.id);

  await getAppointmentFull(appointment.id);
  await getDoctorUpcomingAppointments(doctor.id);

  await setAppointmentStatus(appointment.id, "completed");
  await setAppointmentStatus(appointment.id, "scheduled");

  const cancelledCount = await cancelAllPatientAppointments(patient.id);
  console.log("Appointments cancelled:", cancelledCount);

  await deleteAppointment(appointment.id);
  await deletePatient(patient.id);
  await deleteDoctor(doctor.id);

  console.log("All CRUD tests completed successfully!");
}

main()
  .catch((error) => {
    console.error("Test failed:", error);
    process.exitCode = 1;
  });
  