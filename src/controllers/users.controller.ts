import { createUser, verifyUser } from '../services/database/users'
import { Request, Response } from 'express'

export const addUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName, isAdmin, accountName } = req.body

    try {
        if (!email || !firstName || !lastName) {
            throw new Error('Missing required fields')
        }
        const user = await createUser(email, firstName, lastName, accountName, isAdmin)
        res.json(user)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const verifyAccountInUser = async (req: Request, res: Response) => {
    const { email } = req.query

    try {
        if (!email) {
            throw new Error('Missing required fields')
        }
        const user = await verifyUser(email as string)
        res.json(user !== null)
    } catch (error) {
        res.json({})
    }
}