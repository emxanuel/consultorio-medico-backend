import { PrismaClient } from "@prisma/client";
import { Insurance, Person, EmergencyContact, Visit } from "@/types";

const prisma = new PrismaClient();

export const getPersonById = async (id: number) => {
  return await prisma.person.findUnique({
    where: { id },
    include: {
      emergencyContacts: true,
      insurances: true,
    },
  });
};

export const createPerson = async (
  personInfo: Person,
  insuranceInfo: Insurance,
  emergencyContactInfo: EmergencyContact,
  visitInfo: Visit
) => {
  return await prisma.person.create({
    data: {
      ...personInfo,
      insurances: {
        create: insuranceInfo,
      },
      emergencyContacts: {
        create: emergencyContactInfo,
      },
      visits: {
        create: visitInfo
      },
    },
  });
};
