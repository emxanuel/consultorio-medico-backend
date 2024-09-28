import { PrismaClient } from "@prisma/client";
import { Insurance, Person, EmergencyContact, Visit } from "../../../types";

const prisma = new PrismaClient();

export const getPersonById = async (id: number) => {
  return await prisma.person.findUnique({
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
  enterpriseId: number,
  isAdmin: boolean
) => {

  if (isAdmin){
    return await prisma.person.create({
      data: {
        ...personInfo,
        insurance: {
          create: insuranceInfo,
        },
        enterprise_admin: {
          create: {
            enterprise_id: enterpriseId,
            enterprise_owner: 1
          }
        }
      },
    });
  }

  return await prisma.person.create({
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
      enterprise_person: {
        create: {
          enterprise_id: enterpriseId,
        }
      }
    },
  });
};
