import prisma from "./lib/prisma.js";

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      email: "priya.sharma@hospital.io"
    }
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Vikram Rao",
      specialty: "Neurology",
      email: "vikram.rao@hospital.io"
    }
  });

  const patient1 = await prisma.patient.create({
    data: {
      name: "Aditi Mehra",
      email: "aditi@example.com",
      phone: "9876543210",
      dateOfBirth: new Date("1990-04-12")
    }
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Rahul Singh",
      email: "rahul@example.com"
    }
  });

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patient1.id,
        doctorId: doctor1.id,
        appointmentDate: new Date("2024-08-15T10:00:00"),
        status: "scheduled",
        notes: "Annual cardiac checkup"
      },
      {
        patientId: patient2.id,
        doctorId: doctor2.id,
        appointmentDate: new Date("2024-08-16T14:30:00"),
        status: "scheduled"
      }
    ]
  });

  console.log("Seed completed successfully!");
  console.log("Doctors: 2");
  console.log("Patients: 2");
  console.log("Appointments: 2");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });