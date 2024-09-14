import { PrismaClient } from "@prisma/client";  
import { Insurance, Person, EmergencyContact, Visit } from "@/types";

const prisma = new PrismaClient();

export const getVisits = async () => {
  return await prisma.visits.findMany({
    include: {
      person: true,
    },
  });
}

export const getVisitById = async (id: number) => {
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