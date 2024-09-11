import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInsuranceByPersonId = async (id: number) => {
  return await prisma.insurance.findFirst({
    where: { person_id: id },
    include: {
      person: true,
    },
  });
};
