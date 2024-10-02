import prisma from "../../../prisma";
import { Insurance, Person, EmergencyContact, Visit } from "../../../types";
import { getAccountByKey } from "../accounts";

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
  accountKey: string,
) => {

  const account = await prisma.accounts.findFirst({
    where: {
      account_key: accountKey,
    },
    select: {
      id: true
    }
  })

  if (!account) {
    throw new Error("Account not found");
  }

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
          account_id: account.id,
        }
      }
    },
  });
};
