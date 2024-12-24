import { users } from "@prisma/client";

export type IUpdateUserPayload = Omit<users, 'id'|'created_at'>