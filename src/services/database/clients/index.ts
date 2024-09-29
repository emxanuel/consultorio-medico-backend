import { PrismaClient } from "@prisma/client";
import { Insurance, Person, EmergencyContact, Visit } from "../../../types";

const prisma = new PrismaClient();

export const getPersonById = async (id: number) => {
  return await prisma.clients.findUnique({
    where: { id },
    include: {
      emergency_contact: true,
      insurance: true,
    },
  });
};

export const createPerson = async (
  personInfo: Person,
  insuranceInfo: Insurance,
  emergencyContactInfo: EmergencyContact,
  visitInfo: Visit,
  accountId: number,
) => {

  return await prisma.clients.create({
    data: {
      ...personInfo,
      insurance: {
        create: insuranceInfo,
      },
      emergency_contact: {
        create: emergencyContactInfo,
      },
      visits: {
        create: visitInfo
      },
      account_client: {
        create: {
          account_id: accountId,
        }
      }
    },
  });
};
