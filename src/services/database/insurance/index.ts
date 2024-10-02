import prisma from "../../../prisma";

export const getInsuranceByPersonId = async (id: number) => {
  return await prisma.insurance.findFirst({
    where: { person_id: id },
    include: {
      person: true,
    },
  });
};
