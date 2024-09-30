import { PrismaClient } from "@prisma/client";  
import { Insurance, Person, EmergencyContact, Visit } from "../../../types";

const prisma = new PrismaClient();

export const getVisits = async (accountKey: string) => {

  try {
    if (!accountKey) return [];

    const account = await prisma.accounts.findFirst({
      where: {
        account_key: accountKey,
      },
      select: {
        id: true,
      },
    });

    if (!account) return [];

    const visits = await prisma.visits.findMany({
      include: {
        person: {
          include: {
            account_client: true
          },
        },
      }
    });

    const result = visits.filter((visit) => {
      return visit.person.account_client[0].account_id === account.id;
    });

    return result;
  } catch (error) {
    console.error("Error fetching visits:", error);
    throw error;
  }
}

export const getVisitById = async (id: number, accountKey?: string) => {
  return await prisma.visits.findUnique({
    where: { id },
    include: {
      person: true,
    },
  });
}

export const getVisitsByPatientId = async (id: number) => {
  return await prisma.visits.findMany({
    where: { patient_id: id },
    include: {
      person: true,
    },
  });
};

export const answerToVisit = async (id: number, diagnosis: string, status: number) => {
  return await prisma.visits.update({
    where: { id },
    data: {
      diagnosis,
      status,
    },
  });
}