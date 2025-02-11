import prisma from "../../../prisma";

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
            account_client: true,
          },
        },
      },
    });

    const result = visits.filter((visit) => {
      return visit.person.account_client[0].account_id === account.id;
    });

    return result;
  } catch (error) {
    console.error("Error fetching visits:", error);
    throw error;
  }
};

export const getVisitById = async (id: number) => {
  return await prisma.visits.findUnique({
    where: { id },
    include: {
      person: true,
    },
  });
};

export const getVisitsByPatient = async (document: string) => {
  const patient = await prisma.clients.findFirst({
    where: {
      document_id: document,
    },
  });

  if (!patient) return {
    patient: null,
    visits: [],
  };

  const visits = await prisma.visits.findMany({
    where: { patient_id: patient.id },
    include: {
      person: true,
    },
  });

  return {
    patient,
    visits,
  }
};

export const answerToVisit = async (
  id: number,
  diagnosis: string,
  status: number
) => {
  return await prisma.visits.update({
    where: { id },
    data: {
      diagnosis,
      status,
    },
  });
};

export const getTodayVisitsCount = async (accountKey: string) => {
  const account = await prisma.accounts.findFirst({
    where: {
      account_key: accountKey,
    },
  });

  if (!account) return [];

  const today = new Date().toISOString();

  return await prisma.$queryRaw`
    SELECT COUNT(*) FROM visits
    WHERE account_id = ${account.id}
    AND DATE(visit_date) = DATE(${today})
  `;
};

// export const getRecentActivity = async (accountKey: string) => {
//   const account = await prisma.accounts.findFirst({
//     where: {
//       account_key: accountKey,
//     },
//   });
// 
//   if (!account) return [];
// 
//   return await prisma.visits.findMany({
//     ,
//     take: 5,
//     orderBy: {
//       visit_date: "desc",
//     },
//   });
// }