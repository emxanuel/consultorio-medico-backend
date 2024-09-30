import { Request, Response } from "express";
import { getAccountByKey, getUserAccounts } from "../services/database/accounts";

export const getAccount = async (req: Request, res: Response) => {
    const { key } = req.params

    try {
        if (!key) {
            throw new Error('Missing required fields')
        }
        const account = await getAccountByKey(key)
        res.json(account)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const getAccountsByUser = async (req: Request, res: Response) => {
    const { email } = req.params

    try {
        if (!email) {
            throw new Error('Missing required fields')
        }
        const accounts = await getUserAccounts(email)
        res.json(accounts)
    } catch (error) {
        res.status(400).json({error})
    }
}