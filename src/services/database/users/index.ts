import prisma from "../../../prisma";
import { IUpdateUserPayload } from "../../../types/users";

export const getUserById = async (id: number)  => {
    return await prisma.users.findUnique({
        where: { id },
    });
}

export const verifyUser = async (email: string) => {
    return await prisma.users.findFirst({
        where: { email },
    });
}

export const createUser = async (email: string, firstName: string, lastName: string, accountName: string, isAdmin: boolean) => {
    const user = await prisma.users.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email,
            created_at: new Date().toISOString(),
            account_admin: {
                create: {
                    accounts: {
                        create: {
                            name: accountName,
                            created_at: new Date().toISOString(),

                        },
                    },
                    account_owner: isAdmin? 1 : 0,
                },
            }
        },
        include: {
            account_admin: true
        }
    });

    await prisma.accounts.update({
        data: {
            admin_id: user.id
        },
        where: {
            id: user.account_admin[0].account_id ?? undefined
        }
    })
}

export const updateUser = async (body: IUpdateUserPayload, email: string) => {
    const user = await prisma.users.findFirst({
        where: { email },
    });

    if(!user){
        throw new Error('User not found');
    }

    return await prisma.users.update({
        data: body,
        where: { email },
    });
}