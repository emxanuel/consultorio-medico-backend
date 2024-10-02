import prisma from "../../../prisma";

export const getEmergencyContactByPersonId = async (id: number) => {
  return await prisma.emergencyContact.findMany({
    where: { person_id: id },
    include: {
      person: true,
    },
  });
};