import { Request, Response } from "express";
import { createSubscription } from "../services/database/subscriptions";

export async function createSubscriptionController (req: Request, res: Response) {
  try {
    const subscription = await createSubscription(req.body)

    if (subscription instanceof Error) {
      throw subscription
    }

    res.status(201).json({
      message: 'Subscription created',
    })
  }
  catch (error) {
    res.status(400).send(error)
  }
}