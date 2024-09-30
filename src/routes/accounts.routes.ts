import { Router, Request, Response } from "express";
import { getAccount, getAccountsByUser } from "../controllers/accounts.controller";

const accountsRouter = Router();

accountsRouter.get('/user/:email', getAccountsByUser)
accountsRouter.get("/:key", getAccount);

export default accountsRouter;