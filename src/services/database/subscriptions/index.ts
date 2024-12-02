import prisma from "../../../prisma";
import { CreateSubscriptionPayload } from "../../../types/subscriptions";

export const createSubscription = async (data: CreateSubscriptionPayload) => {
  try {
    const account = await prisma.accounts.findFirst({
      where: {
        account_key: data.accountKey
      }
    })
  
    if (!account) {
      throw new Error('Account not found')
    }
  
    const subscription = await prisma.subscriptions.create({
      data: {
        provider: data.provider,
        price: data.price,
        external_subscription_id: data.externalSubscriptionId,
        created_at: new Date().toISOString(),
      }
    })

    await prisma.accounts_subscriptions.create({
      data: {
        account_id: account.id,
        subscription_id: subscription.id
      }
    })

    await prisma.accounts.update({
      where: {
        id: account.id
      },
      data: {
        active: true
      }
    })

    return subscription

  }
  catch (error) {
    return error
  }
}