import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAccountByKey = async (key: string) => {
    const accountInfo = await prisma.accounts.findFirst({
        where: { account_key: key },
        select: {
            account_key: true,
            admin_id: true,
            created_at: true,
            name: true
        }
    });

    const adminInfo = await prisma.users.findUnique({
        where: { id: accountInfo?.admin_id || 0 },
        select: {
            email: true
        }
    });


    return {
        name: accountInfo?.name,
        created_at: accountInfo?.created_at,
        account_key: accountInfo?.account_key,
        admin: {
            email: adminInfo?.email
        }
    }
}

export const getUserAccounts = async (email: string) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });
    console.log(email)
    return await prisma.accounts.findMany({
        where: {
            admin_id: user?.id
        },
        select: {
            account_key: true
        }
    });
} 