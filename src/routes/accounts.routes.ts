import { Router } from "express";
import { getAccount, getAccountsByUser } from "../controllers/accounts.controller";
import { activateAccountController, deactivateAccountController } from "../controllers";

const accountsRouter = Router();

accountsRouter.get('/user/:email', getAccountsByUser)
accountsRouter.get("/:key", getAccount);
accountsRouter.post("/:key/activate", activateAccountController);
accountsRouter.post("/:key/deactivate", deactivateAccountController);

export default accountsRouter;