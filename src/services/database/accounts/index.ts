import prisma from "../../../prisma";

export const getAccountByKey = async (key: string) => {
    const accountInfo = await prisma.accounts.findFirst({
        where: { account_key: key },
        select: {
            account_key: true,
            admin_id: true,
            created_at: true,
            name: true,
            active: true
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
        },
        active: accountInfo?.active
    }
}

export const getUserAccounts = async (email: string) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });
    return await prisma.accounts.findMany({
        where: {
            admin_id: user?.id
        },
        select: {
            account_key: true,
            name: true,
            active: true,
        }
    });
}

export const activateAccount = async (key: string) => {
    const account = await prisma.accounts.findFirst({
        where: {
            account_key: key
        }
    })

    if (!account) {
        throw new Error("Account not found");
    }

    await prisma.accounts.update({
        where: {
            account_key: key
        },
        data: {
            active: true
        }
    });

    return {
        account_key: account.account_key,
        name: account.name,
        active: true
    }
}

export const deactivateAccount = async (key: string) => {
    const account = await prisma.accounts.findFirst({
        where: {
            account_key: key
        }
    })

    if (!account) {
        throw new Error("Account not found");
    }

    await prisma.accounts.update({
        where: {
            account_key: key
        },
        data: {
            active: false
        }
    });

    return {
        account_key: account.account_key,
        name: account.name,
        active: false
    }
}